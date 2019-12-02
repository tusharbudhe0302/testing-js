'use strict';
var employee = require('./db/employee.schema');

var getEmployeeList = function () {
    return new Promise((resolve, reject) => {
        employee.find().then((employees) => {
            resolve(employees)
        }).catch((ex) => {
            reject(ex);
        })
    })

}
var getEmployeeByEmail = function (email) {
    return new Promise((resolve, reject) => {
        employee.find({ email: email }).then((employees) => {
            resolve(employees)
        }).catch((ex) => {
            reject(ex)
        })
    })
}
var createEmployee = function (checkEmail, employeeObject) {
    // console.log(`createEmployeeServices  email : ${checkEmail} employeeObject: ${JSON.stringify(employeeObject)}`);
    return new Promise((resolve, reject) => {
        employee.findOne({ email: checkEmail }).then((alreadyExist) => {
            if (alreadyExist) {
                // console.log(`IsAlreadyExist : ${alreadyExist}`);
                return resolve(null);
            } else {
                var newEmployee = new employee(employeeObject);
                employee.create(newEmployee).then((newEmp) => {
                    return resolve(newEmp);
                }).catch((ex) => {
                    reject(ex);
                });
            }
        }).catch((ex) => {
            reject(ex);
        });
    })
}
var updateEmployee = function (checkEmail, employeeObject) {
    // console.log(`createEmployeeServices  email : ${checkEmail} employeeObject: ${JSON.stringify(employeeObject)}`);
    return new Promise((resolve, reject) => {
        const filter = { email: checkEmail };
        let updateEmployeeObj = { firstName: employeeObject.firstName, lastName: employeeObject.lastName };
        employee.countDocuments(filter).then((count) => {
            if (count > 0) {
                employee.findOneAndUpdate(filter, updateEmployeeObj, { new: true }).then((updatedEmployee) => {
                    // console.log(`updatedEmployee : ${updatedEmployee}`);
                    return resolve(updatedEmployee);
                }).catch((ex) => {
                    reject(ex);
                });
            } else {
                return resolve(null);
            }
        }).catch((ex) => {
            reject(ex);
        });
    })
}
var updateEmployeeFirstName = function (checkEmail, employeeFirstName) {
    // console.log(`createEmployeeServices  email : ${checkEmail} employeeObject: ${JSON.stringify(employeeObject)}`);
    return new Promise((resolve, reject) => {
        const filter = { email: checkEmail };
        let updateEmployeeObj = { firstName: employeeFirstName };
        employee.countDocuments(filter).then((count) => {
            if (count > 0) {
                employee.findOneAndUpdate(filter, updateEmployeeObj, { new: true }).then((updatedEmployee) => {
                    // console.log(`updatedEmployee : ${updatedEmployee}`);
                    return resolve(updatedEmployee);
                }).catch((ex) => {
                    reject(ex);
                });
            } else {
                return resolve(null);
            }
        }).catch((ex) => {
            reject(ex);
        });
    })
}
var updateEmployeeLastName = function (checkEmail, employeeLastName) {
    // console.log(`createEmployeeServices  email : ${checkEmail} employeeObject: ${JSON.stringify(employeeObject)}`);
    return new Promise((resolve, reject) => {
        const filter = { email: checkEmail };
        let updateEmployeeObj = { lastName: employeeLastName };
        employee.countDocuments(filter).then((count) => {
            if (count > 0) {
                employee.findOneAndUpdate(filter, updateEmployeeObj, { new: true }).then((updatedEmployee) => {
                    // console.log(`updatedEmployee : ${updatedEmployee}`);
                    return resolve(updatedEmployee);
                }).catch((ex) => {
                    reject(ex);
                });
            } else {
                return resolve(null);
            }
        }).catch((ex) => {
            reject(ex);
        });
    })
}
var deleteEmployee = function (checkEmail) {
    // console.log(`deleteEmployee  email : ${checkEmail} `);
    return new Promise((resolve, reject) => {
        const filter = { email: checkEmail };
        employee.countDocuments(filter).then((count) => {
            if (count > 0) {
                employee.findOneAndDelete(filter).then((deletedEmployee) => {
                    // console.log(`deletedEmployee : ${deletedEmployee}`);
                    return resolve(deletedEmployee);
                }).catch((ex) => {
                    reject(ex);
                });
            } else {
                return resolve(null);
            }
        }).catch((ex) => {
            reject(ex);
        });
    })
}
module.exports = { getEmployeeByEmail, getEmployeeList, createEmployee, updateEmployee, updateEmployeeFirstName, updateEmployeeLastName, deleteEmployee };