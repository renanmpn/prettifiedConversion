var request = require("superagent"),
    assert = require('assert'),
    scupTel = require("../app.js"),
    base_url = "http://localhost:3000/";

describe("RenanMPN - Crossover", function() {

  describe("GET /", function() {
	  it("returns status code 200", function() {
		request.get(base_url, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
      
      });
    });
  });
  
  describe("GET /index.html", function() {
	  it("returns status code 200", function() {
		request.get(base_url+"index.html", function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
      
      });
    });
  });
  
  
  
  describe("POST convertNumber", function() {
	  it('Posting Raw Number to get the prettified number - 1000000 -> 1M', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": 1000000})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('1M',res.body.prettifiedNumber);        
            done();        
        });
      });
      it('Posting Raw Number to get the prettified number - 2500000.34 -> 2.5M', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": 2500000.34})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('2.5M',res.body.prettifiedNumber);        
            done();        
        });
      });
      
      it('Posting Raw Number to get the prettified number - 532 -> 532', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": 532})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('532',res.body.prettifiedNumber);        
            done();        
        });
      });
      
      it('Posting Raw Number to get the prettified number - 1123456789 -> 1.1B', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": 1123456789})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('1.1B',res.body.prettifiedNumber);        
            done();        
        });
      });
      
      it('Posting Raw Number to get the prettified number - 1000000000000 -> 1T', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": 1000000000000})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('1T',res.body.prettifiedNumber);        
            done();        
        });
      });      
  });
  
  describe("POST convertNumber - Corner cases", function() {
	  it('Bad Parameter - PostCall', function(done) {
        request.post(base_url+"convertNumber")
        .send({"number": 1000000})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('Bad parameters. Please check your POST call.',res.body.error);        
            done();        
        });
      });
      
      it('Bad Parameter - Not a Number', function(done) {
        request.post(base_url+"convertNumber")
        .send({"rawNumber": "100we0000"})      
        .end(function(err,res) {
            if(err) return done(err);                                   
            
            assert.equal('Bad parameters. You should send a valid number.',res.body.error);        
            done();        
        });
      });
      
      
            
  });
  
  
  

});