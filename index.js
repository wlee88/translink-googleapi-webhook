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
        var speech = `There is a ${busData.busNumber} arriving in ${busData.arrivingIn} minutes`;
        return res.json({
            speech: speech,
            displayText: speech,
            source: 'webhook-echo-sample'
        });
    })
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
