'use strict';

/**
 * Main server file
 */

/* Modules */
var express         = require('express');
var app             = express();
var router          = express.Router();
var bodyParser      = require('body-parser');
var config          = require('./libs/config');
var suggestRoute    = require('./routes/suggest');

/* Configurations */
var port            = config.port;

app.use(bodyParser.json());
app.use('/api/suggest', suggestRoute);
app.use(express.static(__dirname + '/public'));

// Angular App Route, all routes -- web app
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

/* App Start */
app.listen(port, function() {
    console.log("RedditTool running on PORT: " + port);
});
