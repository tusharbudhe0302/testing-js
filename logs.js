'use strict';

var fs = require('fs');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator');
var morgan = require('morgan');
const config = require('./app.config').config;
// Ensure log directory exists
fs.existsSync(config.accessLogsPath) || fs.mkdirSync(config.accessLogsPath);
module.exports.configureLogs = function (app) {
    // Create a rotating write stream
    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(config.accessLogsPath, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
    });
    // Setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
}