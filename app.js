'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const parsetoken = require('parse-bearer-token');
const eventEmitter = require('events').EventEmitter;
const appStartEmitter = new eventEmitter();
const app = express();
const routes = express.Router();
const mongoosedb = require('./services/db/utils').mongoose;
app.use(routes);
//logs all requets
require('./logs').configureLogs(app);

const config = require('./app.config').config;

const employeeRoutes = require('./routes/employee')(routes);
const jsonplaceRoutes = require('./routes/jsonplaceholder')(routes);

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
app.use('/api', jsonplaceRoutes);

var mongoDb = mongoosedb.connection;
mongoosedb.connect(`mongodb://${config.mongoDbServer}/${config.mongoDbName}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
mongoDb.on('open', () => {
    console.log(`Db Connection Done`);
});
mongoDb.on('error', (err) => {
    console.log(`Db Connection Error  ${err}`);
});
let PORT = config.PORT;
app.listen(PORT);
console.log(`App is listing on PORT : ${PORT}`);
module.exports = app;
