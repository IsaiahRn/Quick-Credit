// Bring In my connection to the database to be used
import pool from './index';

const queryText = 'DROP TABLE IF EXISTS users, loans, repayments CASCADE';

// @Dropping all the tables from the database
pool.query(queryText)
  .then(() => {
    // console.log('tables deleted permanently successfully!')
  })
  .catch((err) => {
    console.log(err);
  });

pool.on('remove', () => {
  // console.log('Client removed');
  process.exit(0);
});
