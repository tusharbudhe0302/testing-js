
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const parsetoken = require('parse-bearer-token');
const eventEmitter = require('events').EventEmitter;
const appStartEmitter = new eventEmitter();
const app = express();
const routes = express.Router();
app.use(methodOverride())

//logs all requets
require('./logs').configureLogs(app);
app.use(routes);
const config = require('./app.config').config;
const mongoose = require('./routes/services/db/utils').mongoose;
const employeeRoutes = require('./routes/employee')(routes);
// const employeeFeedbackRoutes = require('./routes/employeefeedback')(routes);

//support cors configurations
app.use(cors());
//support parsing
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// middleware should call for every request. If you want to Verify JWT token You can do here it self.
app.use(function (req, res, next) {
    // console.log(`Middleware called`);
    next();
});
app.get('/api/hello', (req, res) => {
    res.status(200).send({
        errorMessage: null,
        data: `Hello World API`
    });
});

app.get('/api/forbidden', (req, res, next) => {
    res.status(403).send({
        errorMessage: `Un Authorize`,
        data: null
    });
});

app.get('/api/badrequest/:id', (req, res, next) => {
    const id = req.params.id;
    if (id > 0)
        res.status(200).send({
            errorMessage: null,
            data: `Reqest with ${id}`
        });
    else
        res.status(400).send({
            errorMessage: `Bad Request`,
            data: null
        });
});
app.use('/api', employeeRoutes);
// app.use('/api', employeeFeedbackRoutes);
appStartEmitter.on(`application_start`, () => {
    applicationStart();
});
mongoose.connect(`mongodb://${config.mongoDbServer}/${config.mongoDbName}`, function (err) {
    if (err) throw err;
    console.log('Mongo successfully connected');
    appStartEmitter.emit(`application_start`);
});
var applicationStart = () => {
    app.listen(config.PORT, () => {
        console.log(`App is listing on PORT : ${config.PORT}`);
        if (config.inTestingPhase)
            app.emit("app_started");
    });
}


module.exports = app;
