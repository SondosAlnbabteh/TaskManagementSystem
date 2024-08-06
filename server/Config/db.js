const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Login',
  password: '1234Ss',
  port: 5432,
});

module.exports = pool;