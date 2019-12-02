const employeeService = require('../services/employee.service');
module.exports = function (employeeRoutes) {
    employeeRoutes.get('/employees', async (req, res, next) => {
        try {
            let listOfEmlpyee = await employeeService.getEmployeeList();
            res.status(200).send({
                errorMessage: null,
                data: listOfEmlpyee
            })
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }
    })
    employeeRoutes.get('/employee/:email', async (req, res, next) => {
        try {
            let email = req.params.email;
            if (email) {
                let employeeById = await employeeService.getEmployeeByEmail(email);
                // console.log(employeeById);
                if (employeeById.length > 0) {
                    res.status(200).send({
                        errorMessage: null,
                        data: employeeById
                    })
                } else {
                    res.status(404).send({
                        errorMessage: `Not Found`,
                        data: null
                    })
                }
            }
            else {
                res.status(400).send({
                    errorMessage: `Bad Request ${email} is required.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }
    })
    employeeRoutes.post('/employee/create', async (req, res, next) => {
        try {
            let checkEmployeeExist = req.body.email;
            let newEmployee = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
            // console.log(`createEmployeeRoutes  form checkEmployeeExist : ${checkEmployeeExist}  newEmployee: ${JSON.stringify(newEmployee)} `);
            let newDbEmployee = await employeeService.createEmployee(checkEmployeeExist, newEmployee);
            // console.log(`newDbEmployee : ${newDbEmployee}`);
            if (newDbEmployee) {
                res.status(201).send({
                    errorMessage: null,
                    data: newDbEmployee
                })
            } else {
                res.status(400).send({
                    errorMessage: `Bad Request ${checkEmployeeExist} is alredy exist.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }
    })
    employeeRoutes.put('/employee/update', async (req, res, next) => {
        try {
            let checkEmployeeExist = req.body.email;
            let newEmployee = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            }
            // console.log(`createEmployeeRoutes  form checkEmployeeExist : ${checkEmployeeExist}  newEmployee: ${JSON.stringify(newEmployee)} `);
            let updatedDbEmployee = await employeeService.updateEmployee(checkEmployeeExist, newEmployee);
            // console.log(`newDbEmployee : ${newDbEmployee}`);
            if (updatedDbEmployee) {
                res.status(200).send({
                    errorMessage: null,
                    data: updatedDbEmployee
                })
            } else {
                res.status(404).send({
                    errorMessage: `Bad Request ${checkEmployeeExist} is not exist.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }
    })
    employeeRoutes.patch('/employee/firstname/:email/:firstname', async (req, res, next) => {
        try {
            let validateEmail = req.params.email;
            let firstNamePatch = req.params.firstname;
            if (validateEmail && firstNamePatch) {
                let updatedDbEmployee = await employeeService.updateEmployeeFirstName(validateEmail, firstNamePatch);
                // console.log(`newDbEmployee : ${newDbEmployee}`);
                if (updatedDbEmployee) {
                    res.status(200).send({
                        errorMessage: null,
                        data: updatedDbEmployee
                    })
                } else {
                    res.status(404).send({
                        errorMessage: `Bad Request ${validateEmail} is not exist.`,
                        data: null
                    })
                }
            } else {
                res.status(404).send({
                    errorMessage: `Bad Request email and firstName is required exist.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }

    })
    employeeRoutes.patch('/employee/lastname/:email/:lastname', async (req, res, next) => {
        try {
            let validateEmail = req.params.email;
            let lastNamePatch = req.params.lastname;
            if (validateEmail && lastNamePatch) {
                let updatedDbEmployee = await employeeService.updateEmployeeLastName(validateEmail, lastNamePatch);
                // console.log(`newDbEmployee : ${newDbEmployee}`);
                if (updatedDbEmployee) {
                    res.status(200).send({
                        errorMessage: null,
                        data: updatedDbEmployee
                    })
                } else {
                    res.status(404).send({
                        errorMessage: `Bad Request ${validateEmail} is not exist.`,
                        data: null
                    })
                }
            } else {
                res.status(404).send({
                    errorMessage: `Bad Request email and lastName is required exist.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }

    })
    employeeRoutes.delete('/employee/:email', async (req, res, next) => {
        try {
            let validateEmail = req.params.email;
            if (validateEmail) {
                let updatedDbEmployee = await employeeService.deleteEmployee(validateEmail);
                // console.log(`newDbEmployee : ${newDbEmployee}`);
                if (updatedDbEmployee) {
                    res.status(200).send({
                        errorMessage: null,
                        data: updatedDbEmployee
                    })
                } else {
                    res.status(404).send({
                        errorMessage: `Bad Request ${validateEmail} is not exist.`,
                        data: null
                    })
                }
            } else {
                res.status(404).send({
                    errorMessage: `Bad Request email is required.`,
                    data: null
                })
            }
        }
        catch{
            res.status(500).send({
                errorMessage: `Internal Server Error`,
                data: null
            })
        }

    })

    return employeeRoutes;
}