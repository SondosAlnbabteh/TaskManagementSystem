const express = require("express");
const cors = require("cors");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Pool } = require("pg");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

require('dotenv').config({
    override: true,
    path: path.join(__dirname, '.env')
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

(async () =>{
    const client = await pool.connect();
    try{
        const { rows } = await client.query('SELECT current_user');
        const currentUser = rows[0]['current_user'];
        console.log(`Current user: ${currentUser}`);
    } catch (err) {
        console.error("Error fetching current user:", err.message);
    } finally {
        client.release();
    }
})();

// Registration
app.post("/register", async (req, res) =>{
    try{
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).send("Server Error");
    }
});

// Login
app.post("/login", async (req, res) =>{
    try{
        const { email, password } = req.body;

        // استرجاع المستخدم بناءً على البريد الإلكتروني
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        // التحقق مما إذا كان المستخدم موجودًا
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // مقارنة كلمة المرور المُدخلة مع كلمة المرور المُشفرة المخزنة
        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        // if (!isPasswordMatch) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }

        // توليد التوكن
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        res.json({ token });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send("Server Error");
    }
});


// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}

app.get("/userinfo", verifyToken, (req, res) =>{
    res.json({ user: req.user });
});

// مثال على كيفية معالجة الطلب في الخادم
app.post('/addTask', async (req, res) => {
    try {
        const { name,  description, idDlete } = req.body;

        // تحقق من البيانات وتحقق من صحة البيانات
        if (!name || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // تنفيذ استعلام لإضافة المهمة إلى قاعدة البيانات
        const result = await pool.query(
            "INSERT INTO tasks (name,  description, idDlete) VALUES ($1, $2, $3) RETURNING *",
            [name,  description, idDlete]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding task:", error.message);
        res.status(500).send("Server Error");
    }
});

/////
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
