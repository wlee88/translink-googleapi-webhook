'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

const busData = require('./bus-data');
const busDataFormatter = require("./bus-data-formatter");
var options = {
    busStopCode: '000827'
};

var speechHelper = (busDataObject) => {
    return `${busDataObject.busNumber} in ${busDataObject.arrivingIn} Minutes`;
}

var compareBusNumbers = (bus1,bus2) =>{
    return bus1.busNumber == bus2.busNumber;
}

var displayTheWordAnother = (busData) => {
    return (compareBusNumbers(busData[0], busData[1])) ? "another" : "a"
}

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    busData(options)
    .then(function(data){
        var busData = busDataFormatter(data);
        
        var speech = `There is a ${speechHelper(busData[0])}, followed by ${displayTheWordAnother(busData)} ${speechHelper(busData[1])}`;
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
