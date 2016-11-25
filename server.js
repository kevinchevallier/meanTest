const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var db;

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://kevin:911gt3@ds039155.mlab.com:39155/meantestdb', (err, database) => {
    if (err) return console.log(err);

    db = database;
    app.listen(3000, () => {
        console.log('running on 3000');
    });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray(function(err, results) {
        if (err) return console.log(err);

        res.render('index.ejs', { quotes: results });
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to the db');
        res.redirect('/');
    });
});
