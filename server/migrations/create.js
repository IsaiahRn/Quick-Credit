// Bring In my connection to the database to be used
import pool from './index';

pool.on('connect', () => {
  console.log('Quick-Credit connected to the db');
});

const queryText = `
                CREATE TABLE IF NOT EXISTS users(
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(128) UNIQUE NOT NULL,
                  firstname VARCHAR(128) NOT NULL,
                  lastname VARCHAR(128) NOT NULL,
                  password VARCHAR(255) NOT NULL,
                  address VARCHAR(255) NOT NULL,
                  status VARCHAR(255) NOT NULL,
                  is_admin BOOLEAN DEFAULT false,
                  created_on TIMESTAMP,
                  modified_on TIMESTAMP DEFAULT NULL);

                 CREATE TABLE IF NOT EXISTS loans(
                  id SERIAL PRIMARY KEY,
                  email VARCHAR(128) REFERENCES users(email) NOT NULL,
                  firstname VARCHAR(128) NOT NULL,
                  lastname VARCHAR(128) NOT NULL,
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
                  paidamount FLOAT NOT NULL,
                  paymentInstallment FLOAT NOT NULL,
                  balance FLOAT NOT NULL,
                  created_on TIMESTAMP);
`;

// @creating the tables into the database
pool.query(queryText)
  .then(() => {
    console.log("tables created successfully!")
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = pool;
