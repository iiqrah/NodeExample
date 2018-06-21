'use strict';

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const bodyParser = require('body-parser')
var http = require("http");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/dev.db');

app
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

//Stay awake by pinging app every 5 mins
setInterval(function() {
    http.get("http://db-db.herokuapp.com");
}, 300000);

function prepareStatement(options){
  var filters = false
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
  'INNER JOIN Augments1 ON Cards.Augment1 = Augments1.AugmentID ' +
  'INNER JOIN Augments2 ON Cards.Augment2 = Augments2.AugmentID ' +
  'INNER JOIN Augments3 ON Cards.Augment3 = Augments3.AugmentID '

  statement = statement + 'WHERE ';
  if (options) {
    console.log("Options: " + JSON.stringify(options));

    if (options.augments) {
      console.log("\nTrue\n");
    } else {
      console.log("\nFALSE\n")
    }


    if (options.primary && options.primary !== "any") {
      filters = true;
      statement = statement + 'Slot1 == \"' + options.primary + "\" AND "
    }
    if (options.secondary && options.secondary !== "any") {
      filters = true;
      statement = statement + 'Slot2 == ' + options.secondary + " AND "
    }
    if (options.melee && options.melee !== "any") {
      filters = true;
      statement = statement + 'Slot3 == ' + options.melee + " AND "
    }
    if (options.gen && options.gen !== "any") {
      filters = true;
      statement = statement + 'Generation == ' + options.gen + " AND "
    }
    if (options.augments) {
      filters = true;
      if (Array.isArray(options.augments)) {
        
        options.augments.forEach(function (aug) {
          statement = statement + '(Augment1 == ' + aug + " OR Augment2 == " + aug + " OR Augment3 == " + aug + ") AND "
        })
      } else {
        statement = statement + '(Augment1 == ' + options.augments + " OR Augment2 == " + options.augments + " OR Augment3 == " + options.augments + ") AND "
      }
    }
  }
  
  //Cleanup based on if there is a WHERE or an AND left
  if (filters) {
    statement = statement.slice(0,-5)
  } else {
    statement = statement.slice(0,-7)
  }

  
  statement = statement + ';'
  return statement;
}

app.get('/', function (req, res) {
  var results = []
  console.log("Statement: " + prepareStatement());
  db.each(prepareStatement(), function (err, row) {
    if (err) {
      console.log("Error: " + err)
    } else {
      //Exception for ryburn
      if (row.Slot1 === 99) {
        row.Slot1 = 4
      }
      //Exception for Stun Batons
      if (row.Slot3 === 99) {
        row.Slot3 = 6
      }

      results.push(row)
    }
  }, function (err, row) {
    res.render('pages/cardSearch', {data: results});
  })
})

app.post('/weapon_search', function (req,res) {
  var statement = ""
  var results = []

  console.log("Body: " + JSON.stringify(req.body))
  statement = prepareStatement({
    primary: req.body.primary,
    secondary: req.body.secondary,
    melee: req.body.melee,
    gen: req.body.gen,
    augments: req.body.augment
  });

  console.log("Statement: " + statement)

  db.each(statement, function (err, row) {
    if (err) {
      console.log("Error: " + err)
    } else {
      //Exception for ryburn
      if (row.Slot1 === 99) {
        row.Slot1 = 4
      }
      //Exception for Stun Batons
      if (row.Slot3 === 99) {
        row.Slot3 = 6
      }

      results.push(row)
    }
  }, function (err, row) {
    res.render('pages/cardSearch', {data: results});
  })
   
})

app.listen(PORT, function () {
  console.log('App running on port ' + PORT)
})