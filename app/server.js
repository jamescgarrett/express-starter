/**
 * Borrowed some from https://github.com/sahat/hackathon-starter
 * https://github.com/sahat/
 **/

 'use strict';

const express = require('express');
const compression = require('compression');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

dotenv.load({ path: '.env.dev' });

/**
 * Controllers (route handlers).
 **/
const controller = require('./controllers/controller');
const apiController = require('./controllers/api');

/**
 * CORS configuration
 **/
var corsOptions = {
  origin: 'http://localhost:8080'
}

/**
 * Create Express server.
 **/
const app = express();

/**
 * Connect to MongoDB.
 **/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 **/
app.set('port', process.env.PORT || 3000);
app.use(expressStatusMonitor());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors(corsOptions))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
    })
}));
app.use(flash());
app.use((req, res, next) => {
    if (req.path === '/api/upload') {
        next();
    } else {
        lusca.csrf()(req, res, next);
    }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 **/
app.get('/', controller.getIndex);


/**
 * API routes.
 **/
app.get('/api/v1/', apiController.getApiIndex);

/**
 * Error Handler.
 **/
app.use(errorHandler());

/**
 * Start Express server.
 **/
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;