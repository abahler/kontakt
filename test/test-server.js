"use strict";

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

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

    it('should return a 201 on a GET for the foobar listing', (done) => {
        chai.request(app)
        .get('/foobar')
        .end( (err, res) => {
            should.equal(err, null);
            res.should.have.status(201);
            done();
        });
    });

    it('should return a 201 on a GET for /kontakts/:userName', (done) => {
        chai.request(app)
        .get('/kontakts/DrDre')
        .end( (err, res) => {
            should.equal(err, null);
            res.should.have.status(201);
            done();
        });
    });
    
});
