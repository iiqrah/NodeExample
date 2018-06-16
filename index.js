'use strict';

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('pages/index');
})

app.listen(PORT, function () {
  console.log('App unning on port ' + PORT)
})