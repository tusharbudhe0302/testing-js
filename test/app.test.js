const http = require('http');
const expect = require('chai').expect;
const supertest = require('supertest');
var app = require('../app');
describe('app module ', () => {
    before('before app start', (done) => {
        done();
    })
    it('OK, Hello - 200', (done) => {
        supertest(app)
            .get('/api/hello')
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
    it('OK, Forbidden - 403', (done) => {
        supertest(app)
            .get('/api/forbidden')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(403);
                expect(body.data).to.be.null;
                expect(body.errorMessage).not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Good Request - 200', (done) => {
        let badId = 5;
        supertest(app)
            .get(`/api/badrequest/${badId}`)
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
    it('OK, Bad Request - 400', (done) => {
        let badId = -5;
        supertest(app)
            .get(`/api/badrequest/${badId}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body.data).to.be.null;
                expect(body.errorMessage).to.not.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
    it('OK, Not Found Request - 404', (done) => {
        supertest(app)
            .get('/api/notfound')
            .then((res) => {
                expect(res.status).to.equal(404);
                done();
            }).catch((err) => {
                done(err);
            })
    })
})