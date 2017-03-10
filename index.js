var express = require('express');
var server = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./secrets').mongoURI;

mongoose.connect(mongoURI);

var foodSchema = mongoose.Schema({
  price: Number,
  category: String,
  isGlutenFree: Boolean,
  calories: Number
});

var Food =mongoose.model('Food', foodSchema);

server.get('/foods', function(req, res){
  Food.find({}, function(err, documents){
    if(err){
      res.status(500).json({
        msg: err
      });
    } else {
      res.status(200).json({
        foods: documents
      });
    }
    });
  });
//get/animals
  server.get('/foods/:id', function(req, res){
    Food.find({_id: req.params.id}, function(err, documents){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          foods: documents
        });
      }
    });
  });
  //POST /animals
  server.post('/foods', function(req, res){
    Food.find({}, function(err, documents){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          foods: documents
        });
      }
      });
    });
  //PUT /animals/:id
  server.put('/foods/:id', function(req, res){
    Food.find({_id: req.params.id}, function(err, documents){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          animals: documents
        });
      }
    });
  });
  //DELETE /animals/:id
  server.listen(port, function(){
    console.log('Now listening on port...', port);
  });
