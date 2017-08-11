'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

const busData = require('./bus-data');
const busDataFormatter = require("./bus-data-formatter");
const options = require('./options');

var speechHelper = (busDataObject) => {
    // so google voice says the bus number better.. personal preference
    var busNumberWithSpaces = busDataObject.busNumber.split('').join(' ');
    var arrivingInIsATime = busDataObject.arrivingIn.includes(".");
    return `${busNumberWithSpaces} ${ arrivingInIsATime ? "at" : "in" } ${busDataObject.arrivingIn} ${arrivingInIsATime ? "" : "minutes" }`;
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
    options.stopCode = options.busStopCode;
    options.direction = options.busDirection;
    busData(options)
        .then(function(data){
            try {
                var busData = busDataFormatter(data);
                if (busData.length == 0) {
                    speech = "Sorry there are no busses at the moment";
                }
                else if(busData.length < 2) {
                    speech = `There is a ${speechHelper(busData[0])}`
                }
                else {
                    var speech = `There is a ${speechHelper(busData[0])}, followed by ${displayTheWordAnother(busData)} ${speechHelper(busData[1])}`;
                }
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
            catch (err){
                var speech = err.message;
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
        });
});

restService.post('/train', function(req, res) {
    options.stopCode = options.trainStopCode;
    options.direction = options.trainDirection;
    busData(options)
        .then(function(data){
            try {
                var busData = busDataFormatter(data);
                if (busData.length == 0) {
                    speech = "Sorry there are no trains at the moment";
                }
                else if(busData.length < 2) {
                    speech = `There is a ${speechHelper(busData[0])}`
                }
                else {
                    var speech = `There is a ${speechHelper(busData[0])}, followed by ${displayTheWordAnother(busData)} ${speechHelper(busData[1])}`;
                }
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
            catch (err){
                var speech = err.message;
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
        });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
