import { Pool } from 'pg';

// @Bring In Keys for DB from configuration folder
import keys from '../config/keys';

// @Make connection to the Database Depending on the environment
if (process.env.NODE_ENV === "production") {
  module.exports = new Pool({
    connectionString: keys.DATABASE_URL,
  });
}

if (process.env.NODE_ENV === "test") {
  module.exports = new Pool({
    connectionString: keys.DATABASE_URL,
  });

} else {
  module.exports = new Pool({
    connectionString: keys.DATABASE_URL,
  });
}