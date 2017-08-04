'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

const busData = require('./bus-data');
const busDataFormatter = require("./bus-data-formatter");
var options = {
    busStopCode: '000827'
};




restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    busData(options)
    .then(function(data){
        var busData = busDataFormatter(data);
        console.log(busData);
        var speech = "There is a " + busData[0].busNumber + " arriving in "
        + busData[0].arrivingIn + " minutes";
        return res.json({
            speech: speech,
            displayText: speech,
            source: 'webhook-echo-sample'
        });
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
