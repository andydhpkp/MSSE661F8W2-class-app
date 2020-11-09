const express = require('express');
const logger = require('andrew');
const bodyParser = require('body-parser');

const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

app.use(logger(logLevel));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes); 

app.use(middleware.error404); 

app.use(middleware.error500);

app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});