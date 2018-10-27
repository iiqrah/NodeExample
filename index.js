'use strict';

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const bodyParser = require('body-parser')

app
.use(express.static(path.join(__dirname, 'public')))
.use(bodyParser.urlencoded({ extended: false }))
.use(bodyParser.json())
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/homepage'); 
})

app.post('/results', function (req,res) {
  console.log("Body: " + JSON.stringify(req.body))
  res.render('pages/homepage', {data: req.body})
   
});

app.listen(PORT, function () {
  console.log('App running on port ' + PORT)
});