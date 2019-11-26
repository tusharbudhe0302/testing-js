var employee = require('./services/db/employee.schema');
module.exports = function (routes) {
    routes.get('/employee/list', (req, res, next) => {
        employee.find().then((employees) => {
            res.status(200).send({ errorMessage: null, data: employees })
        }).catch((ex) => {
            res.status(500).send({ errorMessage: `Internal Server Error ${ex}`, data: null });
        })
    })
    routes.get('/employee/:email', (req, res, next) => {
        let email = req.params.email;
        employee.find({ email: email }).then((employee) => {
            // console.log(`employee : ${employee}`);
            if (employee)
                return res.status(200).send({ errorMessage: null, data: employee });
            else
                return res.status(404).send({ errorMessage: `Employee not found : ${email}`, data: null });
        }).catch((ex) => {
            res.status(500).send({ errorMessage: `Internal Server Error ${ex}`, data: null });
        })
    })
    routes.post('/employee/create', (req, res, next) => {
        console.log(`req.body : ${JSON.stringify(req.body)}`);
        var newEmployee = new employee(req.body);
        employee.findOne({ email: req.body.email }).then((alreadyExist) => {
            if (alreadyExist) {
                console.log(`alreadyExist : ${JSON.stringify(alreadyExist)}`);
                return res.status(400).send({ errorMessage: `Email already exist in system`, data: null });
            } else {
                employee.create(newEmployee).then((newEmp) => {
                    console.log(`isNewCreates : ${JSON.stringify(newEmp)}`);
                    return res.status(201).send({ errorMessage: null, data: newEmp });
                }).catch((ex) => {
                    return res.status(500).send({
                        errorMessage: `Internal Server Error ${ex}`,
                        data: null
                    });
                });
            }
        }).catch((ex) => {
            res.status(500).send({ errorMessage: `Internal Server Erorr ${ex}`, data: null });
        });

    });
    return routes;
}