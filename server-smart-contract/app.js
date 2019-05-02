const compression   = require('compression');
const createError   = require('http-errors');
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const cors          = require('cors');

const app = express();
app.use(compression());
const router = express.Router();

// Require all routes into the application.
const helloworld    = require('./server/routes/hello-world')(router);
const assets        = require('./server/routes/assets')(router);
const user          = require('./server/routes/user')(router);

// Setup logs and connect to Angular
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client-smart-contract/dist')));

// Use all routes into the application.
app.use('/test', helloworld);
app.use('/assets', assets);
app.use('/user', user);

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client-smart-contract/dist/index.html'));
});

module.exports = app;
