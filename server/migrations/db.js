import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Quick-Credit connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
  const queryText = `
                CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  firstname VARCHAR(128) NOT NULL,
                  lastname VARCHAR(128) NOT NULL,
                  email VARCHAR(128) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  address VARCHAR(255) NOT NULL,
                  status VARCHAR(255) NOT NULL,
                  is_admin BOOLEAN DEFAULT false,
                  created_on TIMESTAMP,
                  modified_on TIMESTAMP DEFAULT NULL);

                 CREATE TABLE IF NOT EXISTS loans(
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(128) REFERENCES users(email) NOT NULL,
                  firstname VARCHAR(128) REFERENCES users(firstname) NOT NULL,
                  lastname VARCHAR(128) REFERENCES users(lastname) NOT NULL,
                  status VARCHAR(128) NOT NULL,
                  repaid BOOLEAN NOT NULL,
                  tenor INTEGER NOT NULL,
                  amount FLOAT NOT NULL,
                  paymentInstallment FLOAT NOT NULL,
                  balance FLOAT NOT NULL,
                  interest FLOAT NOT NULL,
                  created_on TIMESTAMP,
                  modified_on TIMESTAMP DEFAULT NULL);

                CREATE TABLE IF NOT EXISTS repayments(
                  id SERIAL PRIMARY KEY,
                  loan_id INTEGER REFERENCES loans(id) NOT NULL,
                  amount FLOAT NOT NULL,
                  paymentInstallment FLOAT NOT NULL,
                  balance FLOAT NOT NULL,
                  created_on TIMESTAMP);
`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, loans, repayments CASCADE';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  // console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};
