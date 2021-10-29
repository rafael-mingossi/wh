const express = require('express');
const app = express();
const mongoose = require('mongoose');

//require the library dotenv for the environment variables
require('dotenv/config');

const authJwt = require('./helpers/jwt'); //secure the server based on token
const errorHandler = require('./helpers/error-handler');

//middleware()
app.use(express.json());
app.use(authJwt());
app.use(errorHandler);

//Routes
const ratesRoutes = require('./routes/rates');
const addRoutes = require('./routes/adds');
const invoiceRoutes = require('./routes/invoices');
const usersRoutes = require('./routes/users');

//using .env file
const api = process.env.API_URL;

app.use(`${api}/rates`, ratesRoutes);
app.use(`${api}/adds`, addRoutes);
app.use(`${api}/invoices`, invoiceRoutes);
app.use(`${api}/users`, usersRoutes);

//Mongo connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'workedHours',
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection is ready');
  })
  .catch((err) => {
    console.error(err);
  });

//Development
app.listen(3000, () => {
  console.log('server is running http://localhost:3000');
});
