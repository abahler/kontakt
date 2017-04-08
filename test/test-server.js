"use strict";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let User = require('../models/user'); 
let Card = require('../models/card');

let should = chai.should();
let app = server.app;

chai.use(chaiHttp);

describe('kontakt', function(){
    
    // Must have Mongo running, or the 'before' and 'after' hooks will result in timeout errors
    beforeEach(function(done) {
        // Question: how to best create a User and a Card, then call done()?
        // FAIL: creating the User, then creating the Card in the callback, and calling done() in that callback
        
        server.runServer(function() {
            User.create({
                firstName: 'Jane',
                lastName: 'Doe',
                userName: 'jdoe123',
                password: 'thisistest'
            }, () => {
                done();
            });
        });
    });
    
    afterEach(function(done) {
        // Remove entire collection
        User.remove({"userName": "jdoe123"}, function() {
            done();
        });
    }); 

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

    it("should return a 201 on a GET for a user's kontakts", function(done) {
        chai.request(app)
        .get('/kontakts/jdoe123')
        .end( function(err, res){
            console.log('res: ', res);
            should.equal(err, null);
            res.should.have.status(201);
            done();
        });
    });
    
    // it("should return a 201 on a GET for a user's card", function(done) {
    //     chai.request(app)
    //     .get('/card/jdoe')
    //     .end( function(err, res){
    //         console.log('res: ', res);
    //         should.equal(err, null);
    //         res.should.have.status(201);
    //         done();
    //     });
    // });

});
