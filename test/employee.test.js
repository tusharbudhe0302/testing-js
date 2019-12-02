const http = require('http');
const expect = require('chai').expect;
const supertest = require('supertest');
var app = require('../app');
let employeeTest = { email: 'tushar1@gc.com', firstName: 'Tushar', lastName: 'Budhe' };
describe('employee module ', () => {
    before('before employee start', (done) => {
        done();
    })
    it('OK, Create Employee - 201', (done) => {
        supertest(app)
            .post('/api/employee/create')
            .send(employeeTest)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(201);
                expect(body.data).to.contain.property('_id');
                expect(body.errorMessage).to.be.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Create Duplicate Employee - 400', (done) => {
        supertest(app)
            .post('/api/employee/create')
            .send(employeeTest)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Get Employee - 200', (done) => {
        supertest(app).get('/api/employee/' + employeeTest.email)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.data).not.null;
                expect(body.errorMessage).to.be.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Get Employees - 200', (done) => {
        supertest(app)
            .get('/api/employees')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.data).not.null;
                expect(body.errorMessage).to.be.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Update Employee - 200', (done) => {
        employeeTest.firstName = 'Update firstname';
        employeeTest.lastName = 'Update lastname'
        supertest(app)
            .put('/api/employee/update')
            .send(employeeTest)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.data).not.null;
                expect(body.data.firstName).to.be.equal(employeeTest.firstName);
                expect(body.data.lastName).to.be.equal(employeeTest.lastName);
                expect(body.errorMessage).to.be.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Patch Employee First Name- 200', (done) => {
        employeeTest.firstName = 'Patch firstname';
        supertest(app)
        supertest(app).patch(`/api/employee/firstname/${employeeTest.email}/${employeeTest.firstName}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.errorMessage).to.be.null;
                expect(body.data).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Patch Employee Last Name- 200', (done) => {
        employeeTest.lastName = 'Patch lastname';
        supertest(app)
            .patch(`/api/employee/lastname/${employeeTest.email}/${employeeTest.lastName}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.errorMessage).to.be.null;
                expect(body.data).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Delete Employee - 200', (done) => {
        supertest(app)
            .delete(`/api/employee/${employeeTest.email}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.errorMessage).to.be.null;
                expect(body.data).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Update Employee - 404', (done) => {
        supertest(app)
            .put('/api/employee/update')
            .send(employeeTest)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Patch First Name Employee - 404', (done) => {
        supertest(app)
            .patch(`/api/employee/firstname/${employeeTest.email}/${employeeTest.firstName}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Patch Last Name Employee - 404', (done) => {
        supertest(app)
            .patch(`/api/employee/lastname/${employeeTest.email}/${employeeTest.lastName}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Delete Employee - 404', (done) => {
        supertest(app)
            .delete(`/api/employee/${employeeTest.email}`)
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
})