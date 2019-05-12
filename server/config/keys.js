/**
 * @BringIn the development,
 * production,test environment keys
 */

import devKeys from './dev.keys';
import testsKeys from './tests.keys';
import prodKeys from './prod.keys';

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKeys;
}

if (process.env.NODE_ENV === 'test') {
  module.exports = testsKeys;
} else {
  module.exports = devKeys;
}

console.log(process.env.NODE_ENV);
