'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// ---------------------- payment gateway --------------------------
var express = require('express');
var app1 = express();
var ccavresponsehandler = require('./handleresponse.js');
app1.post('/handleresponse', function(request, response) {
  ccavresponsehandler.ccavres(request, response);
});

app1.listen(3008);
// ---------------------- payment gateway --------------------------

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log(app.get('url'));
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
