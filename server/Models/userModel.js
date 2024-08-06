const pool = require('../Config/db');
const bcrypt = require('bcryptjs');

class User {
  static async createUser(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );
    return result.rows[0];
  }

  static async createTask(  name, date, description) {
    const result = await pool.query('INSERT INTO tasks ( name, date, description ) VALUES ($1, $2, $3) RETURNING *',
      [ name, date, description]);
    return result.rows[0];
  }

  static async deleteTask(id) {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    // Optionally check if rows were deleted
    if (result.rowCount === 0) {
      throw new Error('Task not found');
    }
    return { message: 'Task deleted successfully' };
  }
  
  static async updateTaske(id, updatedTask) {
    const { name, description } = updatedTask;
    const result = await pool.query(
      `UPDATE public.tasks
      SET name = $1, description = $2
      WHERE id = $3;`,
      [name, description, id]
    );
    if (result.rowCount === 0) {
      throw new Error('Task not found');
    }
    return { message: 'Task updated successfully' };
  }
  
  
  
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  
  static async findTasks() {
    const result = await pool.query('SELECT * FROM tasks');
    return result.rows;
  }

  
}

module.exports = User;