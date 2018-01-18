const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var fs = require('fs');
var util = require('util');
var send = require('gmail-send')({
  //var send = require('../index.js')({
    user: process.env.GMAIL_USER,
    // user: credentials.user,                  // Your GMail account used to send emails
    pass: process.env.GMAIL_PASS,
    // pass: credentials.pass,                  // Application-specific password
    to:   process.env.GMAIL_TO,
    // to:   credentials.user,                  // Send to yourself
                                             // you also may set array of recipients:
                                             // [ 'user1@gmail.com', 'user2@gmail.com' ]
    // from:    credentials.user             // from: by default equals to user
    // replyTo: credentials.user             // replyTo: by default undefined
    subject: 'q1'
    //html:    '<b>html text</b>'            // HTML
  });
  
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(function(req, res, next) {
    // if (req.query.q1log) {
    //   res.end(fs.readFileSync(logPath, {encoding : 'utf8'}));
    // }
    // else
    if (req.query.q1) {
 
      send({ // Overriding default parameters
        html: req.query.q1,
      }, function (err, res) {
        console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
      });

      // writeStream.write(req.query.q1 + '\n');
      res.end('');
    }
    else {
      res.end('');
    }
    next();
  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
