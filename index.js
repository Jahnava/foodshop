
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
  calories: Number,
  name: String
});


var Food = mongoose.model('Food', foodSchema);

//keep commented out as to not duplicate more chocolate
// var cupCake = new Food({
//   price: 2,
//   category: 'dessert',
//   isGlutenFree: true,
//   calories: 350,
//   name: 'cupcake-a-licious'
// });
// cupCake.save(function(err, data){
//   if(err){
//     console.log(err);
//   } else{
//     console.log(data);
//   }
// });

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


  server.get('/foods/:id', function(req, res){
    Food.find({_id: req.params.id}, function(err, documents){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          food: documents
        });
      }
    });
  });

  server.get('/foods/category/:foodCategory', function(req, res){
    Food.find({category: req.params.foodCategory}, function(err, documents){
      if(err){
        res.status(500).json({
          msg: err
        });
      } else {
        res.status(200).json({
          food: documents
        });
      }
      });
    });



  server.listen(port, function(){
    console.log('Now listening on port...', port);
  });
