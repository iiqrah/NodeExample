'use strict';

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const bodyParser = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db/db.json')
const db = low(adapter)

app
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index');
})

app.post('/weapon_search', function (req,res) {
  var cards = 
  db.get('cards[0]')
  .value();

  console.log(cards);

  if (req.body.gun === "any") {
    var output = cards.cards;
  } else {
    var output = []
    for (var i = 0; i < cards.cards.length; i++) {
      if (cards.cards[i].primary === req.body.gun) {
        output.push(cards.cards[i])
      }
    }
  }

  console.log(output);

  res.render('pages/index', {data: output});
})

app.listen(PORT, function () {
  console.log('App running on port ' + PORT)
})