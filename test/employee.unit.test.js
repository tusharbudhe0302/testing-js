var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var employee = require('../services/db/employee.schema');
describe.skip("Unit test employee module", () => {
    // Test will pass if we get all todos
    it("should return all todos", (done) => {
        var employeeMock = sinon.mock(employee);
        var expectedResult = { status: true, todo: [] };
        employeeMock.expects('find').yields(null, expectedResult);
        employee.find(function (err, result) {
            employeeMock.verify();
            employeeMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
});