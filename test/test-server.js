"use strict";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

describe('kontakt', function(){

    it('should return a 200 on a GET for the root URL', function(done){
        chai.request(app)
        .get('/')
        .end( function(err, res){
            should.equal(err, null);
            res.should.have.status(200);
            done();
        });
    });

    it('should return a 201 on a GET to /foobar', function(done){
        chai.request(app)
        .get('/foobar')
        .end( function(err, res){
            should.equal(err, null);
            res.should.have.status(201);
            done();
        });
    });

    it('should return a 201 on a GET for /kontakts/dluna', function(done) {
        chai.request(app)
        .get("/kontakts/dluna")
        .end( function(err, res){
            console.log('res: ', res);
            should.equal(err, null);
            res.should.have.status(201);
            done();
        });
    });
    
});
