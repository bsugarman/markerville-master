const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const paginate = require('mongo-paginate');

const app = express();
app.use(express.static('public'));


const MONGO_URL = `mongodb://bsugarman:Loftusroad1@ds125053.mlab.com:25053/heroku_bj82h9ds`;

let db = null;
let collection = null;
let collectionForum = null;

async function startServer(){
db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
collection = db.collection('markers');
collectionForum = db.collection('forum');


}

startServer();

async function onLookupWord(req, res, next) {
  const routeParams = req.params;
  const word = routeParams.word;

  const query =   { $or: [{markerName: word}, {biomarkerType: word}, {diseaseType: word}, {associatedDrug: word}, {medium: word}] };

  const cursor = collection.find(query)
  res.status(200).paginate(cursor, { limit: 100 })
});

//    const formattedResults = results.map(function(result) {
//      return {
//        markerName: result.markerName,
//        biomarkerType: result.biomarkerType,
//        diseaseType: result.diseaseType,
//        associatedDrug: result.associatedDrug,
//        medium: result.medium
//      }
//    });

//     const response = {
//       word: word,
//       associated: formattedResults
//     };

//     res.json(response);
}

paginate.extend(app);
app.get('/lookup/:word' , onLookupWord);


  async function getForum(req, res) {
     const routeParams = req.params;
     const word = routeParams.word;


     const results = await collectionForum.find(function(err, cursor) {
       return cursor.toArray();
     });

     console.log(results);

     const formattedResults = results.map(function(result) {
       return {
         question: result.question,
         answer: result.answer

       }
     });

      console.log(formattedResults);
      const response = {

        forumSheet: formattedResults
      };

      res.json(response);
  }
    app.get('/getForum/', getForum);

    app.post('/onPost', jsonParser, function (req, res) {
      console.log("hey");
        const body = req.body;
        const message = body.message;
        collectionForum.insertOne({"question": message, "answer": "unanswered"});
        res.send(message);
        app.get('/getForum/', getForum);
        });



// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
