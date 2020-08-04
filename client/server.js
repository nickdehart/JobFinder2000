const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'Jobs';

app.get('/documents', (req, res) => {
  findDocuments({'not_interested': {$ne: true}}, function(docs) {
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
      let year = element._id.year;
      let month = element._id.month > 9 ? element._id.month : '0' + element._id.month;
      let day = element._id.day > 9 ? element._id.day : '0' + element._id.day;
      element.date = new Date(`${year}-${month}-${day}T00:00:00`);
      element.date2 = `${month}/${day}/${year}`
    })
    res.send(docs.sort((a,b) => {return a.date - b.date}))
  });
});

app.get('/type_data', (req, res) => {
  let agg = [
    { $group: {
        _id: {
            external: "$external",
            applied: "$applied",
            not_interested: '$not_interseted'
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

app.post('/applied', (req, res) => {
  let query = {
    query: req.body,
    update: {
      $set: { 'applied': true }
    }
  }

  updateDocuments(query, function(response) {
    if(response)
      res.sendStatus(200)
    else
      res.sendStatus(500)
  });
})

app.post('/not_interested', (req, res) => {
  let query = {
    query: req.body,
    update: {
      $set: { 'not_interested': true }
    }
  }

  updateDocuments(query, function(response) {
    if(response)
      res.sendStatus(200)
    else
      res.sendStatus(500)
  });
})

const updateDocuments = function(query, callback) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
  
    const db = client.db(dbName);

    const collection = db.collection('listings');
    collection.updateOne(query.query, query.update)
    .then(response => {
      callback(response)
    })
    .catch(err => {
      console.log('Error: ' + err)
      callback(false)
    })
  });
}

const findDocuments = function(query, callback) {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
  
    const db = client.db(dbName);

    const collection = db.collection('listings');
    collection.find(query).sort({'timestamp': -1}).toArray(function(err, docs) {
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

app.listen(port, () => console.log(`Listening on port ${port}`));