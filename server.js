require('app-module-path').addPath('./shared');

var _ = require('lodash');
var vitreumRender = require('vitreum/render');
var express = require("express");
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var seeder = require('./server/seed.js');

// Set up mongo db connection
mongoose.connect('mongodb://localhost/so_calendar');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function() {
  // Do something
});

// Static Assets
app.use(express.static(__dirname + '/build'));

// Fall back on index
app.get('*', function (req, res) {
  vitreumRender({
    page: './build/so_calendar/bundle.dot',
    globals:{},
    prerenderWith : './client/so_calendar/so_calendar.jsx',
    initialProps: {
      url: req.originalUrl
    },
    clearRequireCache : !process.env.PRODUCTION,
  }, function (err, page) {
    return res.send(page)
  });
});

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on localhost:' + port);
