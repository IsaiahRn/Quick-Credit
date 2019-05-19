import moment from 'moment';
import db from '../models';
import password from '../helpers/Bcrypt';


const text = 'INSERT INTO users(firstname,lastname,email,password,address,status,is_admin,created_on)VALUES($1,$2,$3,$4,$5,$6,$7,$8)returning*;';
password.hashPassword('admin1234', 10)
  .then(async (hashedPwd) => {
    const AdminData = ['runoro', 'isaiah', 'admin@test.com', hashedPwd, 'Gisozi', 'Verified', true, moment().format('LLLL')];
    await db.query(text, AdminData);
  })
  .catch((err) => {
    console.log(err);
  });
