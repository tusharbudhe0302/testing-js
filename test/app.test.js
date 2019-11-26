
const chai = require("chai");
var app = require('../app');
let employee = require('../routes/services/db/employee.schema');
let employeeFeedback = require('../routes/services/db/employee.feedback.schema');;
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');
const config = require('../app.config').config;
const { expect } = chai;
chai.use(chaiHttp);

describe('server starting... testing begins.. ', async () => {
    before('before start...', async (done) => {
        app.on("app_started", async () => {
            done();
        });
    });
    after('after testing..', (done) => {
        done()
    })
    it("hello api should have status 200", async (done) => {
        const hello = new Promise(async (resolve) => {
            await chai
                .request(app)
                .get("/api/hello")
                .retry(2)
                .retry(2, (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errorMessage).to.be.null;
                    resolve();
                })
                .then((res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errorMessage).to.be.null;
                    resolve();
                });
        });
        await hello;
        done();
    });
    it.skip("forbidden api should status 403", done => {
        chai
            .request(app)
            .get("/api/forbidden")
            .end((err, res) => {
                expect(res).to.have.status(403);
                expect(res.body.errorMessage).to.equal('Un Authorize');
                expect(res.body.data).to.be.null;
                done();
            });
    });
    it.skip("good request api should return status code 200", done => {
        chai
            .request(app)
            .get("/api/badrequest/5")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.errorMessage).to.be.null;
                expect(res.body.data).to.be.not.null;
                done();
            });
    });
    it.skip("badrequest api should return status 400", done => {
        chai
            .request(app)
            .get("/api/badrequest/-5")
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.errorMessage).to.equal('Bad Request');
                expect(res.body.data).to.be.null;
                done();
            });
    });
    it.skip("post employee api  should return status 201", async done => {
        let employee = {
            firstName: "The Lord of the Rings",
            lastName: "Avengers",
            email: "lionel5@messi.com"
        }
        const createUser = await new Promise(async (resolve) => {
            await chai
                .request(app)
                .post("/api/employee/create")
                .send(employee)
                .retry(2)
                .retry(2, (err, res) => {
                    console.log(`res : ${res}`);
                    expect(res).to.have.status(201);
                    resolve();
                })
        })
        const result = await createUser;
        done();
    });
    it.skip("get employee api  should return status 200", async (done) => {
        return await new Promise(async (resolve) => {
            await chai
                .request(app)
                .get("/api/employee/lionel5@messi.com")
                .retry(2)
                .retry(2, (err, res) => {
                    expect(res).to.have.status(200);
                    resolve(done());
                })
        })
    })
    it.skip("get employee list api  should return status 200", async (done) => {
        return await new Promise(async (resolve) => {
            await chai
                .request(app)
                .get("/api/employee/list")
                .retry(2)
                .retry(2, (err, res) => {
                    expect(res).to.have.status(200);
                    resolve(done());
                })
        })
    })
    it.skip("post employee feedback api", done => {
        chai
            .request(app)
            .post("/api/employee/lionel@messi.com")
            .send({ comment: 'Test Comment' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.data).to.be.not.null;
                done();
            });
    });
});