const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


var fs = require('fs');
var util = require('util');
var d = new Date();
var suffix = [d.getFullYear(), d.getMonth()+1, d.getDate()].join('-');
var logPath = path.join(__dirname, 'public') + '/q1-' + suffix + '.log';
var writeStream = fs.createWriteStream(logPath, {flags : 'w'});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(function(req, res, next) {
    if (req.query.q1log) {
      res.end(fs.readFileSync(logPath, {encoding : 'utf8'}));
    }
    else if (req.query.q1) {
      writeStream.write(req.query.q1 + '\n');
      res.end('');
    }
    else {
      res.end('');
    }
    next();
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
