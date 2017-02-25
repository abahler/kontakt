"use strict";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

describe('kontakt', () => {
    
    it('should return a 200 on a GET for the root URL', (done) => {
        chai.request(app)
        .get('/')
        .end( (err, res) => {
            should.equal(err, null);
            res.should.have.status(200);
            done();
        });
    });
    
});
