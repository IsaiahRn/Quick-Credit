const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  isAdminErrors(res, 403, 'Sorry! Admin permission is required.');
};

const isAdminErrors = (res, status, error) => res.status(status).send({ status, error });
export default isAdmin;
