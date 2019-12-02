const http = require('http');
const expect = require('chai').expect;
const supertest = require('supertest');
var app = require('../app');
describe('employee module ', () => {
    before('before employee start', (done) => {
        done();
    })
    it('OK, JSON Place Hoder 3rd Party API - 200', (done) => {
        supertest(app)
            .get('/api/jsonplace')
            .send()
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body.data).not.null
                expect(body.errorMessage).to.be.null;
                done();
            }).catch((err) => {
                done(err);
            })
    })
})