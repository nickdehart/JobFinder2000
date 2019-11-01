const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'Jobs';

app.get('/documents', (req, res) => {
  findDocuments({}, function(docs) {
    res.send(docs)
  });
});

app.get('/tag_data', (req, res) => {
  let agg = [
    {
        $match: {
            tags: { $not: {$size: 0} }
        }
    },
    { $unwind: "$tags" },
    {
        $group: {
            _id: {$toLower: '$tags'},
            count: { $sum: 1 }
        }
    },
    {
      $match: {
          count: { $gte: 10 }
      }
    },
    { $sort : { count : -1} },
  ];

  aggregateDocuments(agg, function(docs) {
    res.send(docs)
  });
});

app.get('/time_data', (req, res) => {
  let agg = [ 
    { $group: 
      { _id: 
        { 
          year: { $year:"$timestamp" }, 
          month: { $month:"$timestamp" }, 
          day: { $dayOfMonth:"$timestamp" } 
        }, 
        count: { $sum: 1 }
      } 
    } 
  ]

  aggregateDocuments(agg, function(docs) {
    docs.forEach((element) => {
      element.date = new Date(`${element._id.year}-${element._id.month}-${element._id.day}T00:00:00`);
    })
    res.send(docs)
  });
});

app.get('/type_data', (req, res) => {
  let agg = [
    { $group: {
        _id: {
            external: "$external",
            applied: "$applied"
        },
        count: { $sum: 1 } 
    }}
  ]
  aggregateDocuments(agg, function(docs) {
    docs.forEach((element) => {
      if (element._id.applied && element._id.external)
        element.name = "Applied External"
      else if (!element._id.applied && element._id.external)
        element.name = "Not Applied External"
      else if (element._id.applied && !element._id.external)
        element.name = "Applied Internal"
      else 
        element.name = "Not Applied Internal"
    })
    res.send(docs)
  });
});

const findDocuments = function(query, callback) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
  
    const db = client.db(dbName);

    const collection = db.collection('listings');
    collection.find(query).toArray(function(err, docs) {
      assert.equal(err, null);
      client.close()
      callback(docs);
    });
  });
}

const aggregateDocuments = function(agg, callback) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
  
    const db = client.db(dbName);

    const collection = db.collection('listings');
    collection.aggregate(agg).toArray(function(err, docs) {
      assert.equal(err, null);
      client.close()
      callback(docs);
    });
  });
}
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));