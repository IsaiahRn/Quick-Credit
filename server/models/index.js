import pool from '../migrations/create';

module.exports = {
  query(queryText, values) {
    return new Promise((resolve, reject) => {
      pool.query(queryText, values)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  },
};
