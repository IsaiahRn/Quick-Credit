import jwt from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config();

const isAuth = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(400).send({
        status: res.statusCode,
        error: 'No Authorization!',
      });
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
        status: res.statusCode,
        error: 'No token provided, Access Denied!',
      });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(403).send({
        status: res.statusCode,
        error: 'Invalid Token provided!',
      });
  }
};
export default isAuth;
