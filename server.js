const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//const $ = require('jQuery');
const app = express();
app.use(express.static('public'));
 
const MONGO_URL = "mongodb://bsugarman:Loftusroad1@dds263710.mlab.com:63680/heroku_zk18f5jk";


let db = null;
let collection = null;
let collectionForum = null;

async function startServer(){
db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
collection = db.collection('clinicalData');
}

startServer();


async function onLookupWord(req, res) {
   const routeParams = req.params;
   console.log(routeParams);

      
   const word = routeParams.word;

   
   const query =   { $or: [{first: word}, {second: word}, {third: word}, {fourth: word}, {fifth: word}, {sixth: word}] };

   const results = await collection.find(query, function(err, cursor) {
     return cursor.toArray();
   });
 
           console.log(results);

 
   const formattedResults = results.map(function(result) {
     return {
       first: result.first,
       second: result.second,
       third: result.third,
       fourth: result.fourth,
       fifth: result.fifth,
       sixth: result.sixth,
     }
   });
 
    

   const results = await collection.find(query, function(err, cursor) {
     return cursor.batchSize(10).toArray();
   });
 
           console.log(results);



    const response = {
      word: word,
      associated: formattedResults
    };

    res.json(response);
}

  app.get('/lookup/:word/:lastId?' , onLookupWord);




// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});