var employeeFeedback = require('./services/db/employee.feedback.schema');
var employee = require('./services/db/employee.schema');
module.exports = function (routes) {
    routes.post('/employeefeedback/post/:email', (req, res, next) => {
        employee.findOne({ email: req.params.email }).then((alreadyExist) => {
            // console.log(`${JSON.stringify(alreadyExist)}`);
            if (alreadyExist._id) {
                var newEmployeeFeedback = new employeeFeedback({ comment: req.body.comment, employee: alreadyExist._id });
                employeeFeedback.create(newEmployeeFeedback).then((newEmployeeFeedback) => {
                    // console.log(`Employee Feedback Saved`);
                    res.status(200).send({ errorMessage: null, data: newEmployeeFeedback });
                }).catch((ex) => {
                    res.status(500).send({
                        errorMessage: `Internal Server Error ${ex}`,
                        data: null
                    });
                })
            } else {
                res.status(400).send({ errorMessage: `Email is not exist in system`, data: null });
            }
        }).catch((ex) => {
            res.status(500).send({
                errorMessage: `Internal Server Error ${ex}`,
                data: null
            });
        });
    });
    routes.get('/employeefeedback/list', (res, res, next) => {
        employeeFeedback.find().then((feeds) => {
            res.status(200).send({ errorMessage: `Email is not exist in system`, data: feeds })
        }).catch((ex) => {
            res.status(500).send({ errorMessage: `Internal Server Error ${ex}`, data: feeds })
        })
    })
    return routes;
}