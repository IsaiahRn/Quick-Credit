import express from 'express';
import logger from 'morgan';

import authRoutes from './routes/authRoutes';
import loanRoutes from './routes/loanRoutes';
import userVerifyRoute from './routes/userVerifyRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.status(200).send({
  	status: res.statusCode,
    message: 'Welcome To Quick Credit',
  });
});

// User authentication Routes
app.use('/api/v1/auth', authRoutes);

// Loan Routes
app.use('/api/v1/loans', loanRoutes);

// User Route--Mark a user as verified.
app.use('/api/v1/users', userVerifyRoute);

// Handle non-exist route
app.use('*', (req, res) => {
  res.status(404).send({
    status: res.statusCode,
    error: 'Route does not exist. Page Not Found!',
  });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Quick Credit listening at http://localhost:', port);
});


export default app;