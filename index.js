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

function prepareStatement(options){
  var statement = 
'SELECT ' +
  'PrimaryWeapons.WeaponName AS PrimaryName, ' + 
  'SecondaryWeapons.WeaponName AS SecondaryName, ' +
  'MeleeWeapons.WeaponName AS MeleeName, ' +
  'Cards.Slot1, Cards.Slot2, Cards.Slot3, Cards.Generation, Mercs.Name AS Merc, ' +
  'Augments1.Name as Augment1, Augments2.Name as Augment2, Augments3.Name as Augment3 ' +
'FROM Cards ' +
  'INNER JOIN PrimaryWeapons ON Cards.Slot1 = PrimaryWeapons.WeaponID ' +
  'INNER JOIN SecondaryWeapons ON Cards.Slot2 = SecondaryWeapons.WeaponID ' +
  'INNER JOIN MeleeWeapons ON Cards.Slot3 = MeleeWeapons.WeaponID ' +
  'INNER JOIN Mercs ON Cards.MercID = Mercs.MercID ' +
  'INNER JOIN Augments1 AS a1 ON Cards.Augment1 = a1.AugmentID ' +
  'INNER JOIN Augments1 AS a2 ON Cards.Augment2 = a2.AugmentID ' +
  'INNER JOIN Augments1 AS a3 ON Cards.Augment3 = a3.AugmentID '

  if (options) {
    statement = statement + 'WHERE ';
    if (options.gun) {
      statement = statement + 'Slot1 == \"' + options.gun + "\" AND "
    }
  }

  statement = statement.slice(0,-5)
  statement = statement + ';'
  return statement;
}

app.get('/', function (req, res) {
  res.render('pages/index');
})

app.post('/weapon_search', function (req,res) {
  var statement = ""
  var results = []

  if (req.body.gun === "any") {
    statement = prepareStatement();
  } else {
    statement = prepareStatement({gun: req.body.gun});
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
    res.render('pages/index', {data: results});
  })
   
})

app.listen(PORT, function () {
  console.log('App running on port ' + PORT)
})