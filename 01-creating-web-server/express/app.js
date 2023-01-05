const express = require('express');
const createError = require('http-errors');
const indexRoutes = require('./routes/index');
const helloRoutes = require('./routes/hello');

const app = express();

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);

app.use((request, response, next) => {
  if (request.method !== 'GET') {
    next(createError(405));
    return;
  }

  next(createError(404));
});

app.use((error, request, response) => {
  response.status(error.status || 500);
  response.send(error.message);
});

module.exports = app;
