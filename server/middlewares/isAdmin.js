const isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    return next();
  }
  return res.status(403).send({
    status: res.statusCode,
    error: 'Admin permission required!',
  });
};

export default isAdmin;
