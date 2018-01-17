const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


var fs = require('fs');
var util = require('util');
var d = new Date();
var suffix = [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-')

var log_file = fs.createWriteStream((path.join(__dirname, 'public') + '/q1-'+suffix+'.log', {flags : 'w'});
// var log_stdout = process.stdout;


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(function(req, res, next) {
    if (req.query.q1) log_file.write(req.query.q1 + '\n');

    next();
  })
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs')
//  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
