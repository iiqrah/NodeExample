'use strict';

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const bodyParser = require('body-parser')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/dev.db');

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
  var statement = ""
  var results = []

  if (req.body.gun === "any") {
    statement = 
    'SELECT PrimaryWeapons.WeaponName, SecondaryWeapons.WeaponName, WeaponID FROM ' + 
    'Cards ' +
    'INNER JOIN PrimaryWeapons ON Cards.Slot1 = PrimaryWeapons.WeaponID' +
    'INNER JOIN SecondaryWeapons ON Cards.Slot2 = SecondaryWeapons.WeaponID' +
    // '' +
    // '' +
    // '' +q
    ';'
  } else {
    statement = 'SELECT * FROM Cards WHERE Slot1 == \"' + req.body.gun + "\";"
  }

  console.log("Statement: " + statement)

  db.each(statement, function (err, row) {
    if (err) {
      console.log("Error: " + err)
    } else {
      console.log(row)
      results.push(row)
    }
  }, function (err, row) {
    console.log("Complete. Results: " + results)
    res.render('pages/index', {data: results});
  })
   
})

app.listen(PORT, function () {
  console.log('App running on port ' + PORT)
})