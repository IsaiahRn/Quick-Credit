import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerdocs from '../swagger.json';

import authRoutes from './routes/authRoutes';
import loanRoutes from './routes/loanRoutes';
import userVerifyRoute from './routes/userVerifyRoute';

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accepted,Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH ,OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.status(200).send({
  	status: res.statusCode,
    message: 'Welcome To Quick Credit',
  });
});

// User authentication Routes
app.use('/api/v2/auth', authRoutes);

// Loan Routes
app.use('/api/v2/loans', loanRoutes);

// User Route--Mark a user as verified.
app.use('/api/v2/users', userVerifyRoute);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerdocs));

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
