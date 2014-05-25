var http = require('http');
var express = require('express');
var path = require('path');
var React = require('react');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
  res.render('index.jade');
});

app.get('/artist', function(req, res) {
  var component = require('./js-compiled/components/ArtistApp.react');
  res.render('inner.jade', {
    placeHolderId: 'artistComponent',
    contentComponent: React.renderComponentToString(component())
  });
});

app.get('/album', function(req, res) {
  var component = require('./js-compiled/components/AlbumApp.react');
  res.render('inner.jade', {
    placeHolderId: 'albumComponent',
    contentComponent: React.renderComponentToString(component())
  });
});

var server = app.listen(3000, function() {
  console.log('Express has started on port %d', server.address().port);
});
