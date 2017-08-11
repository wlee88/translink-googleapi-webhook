'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

const translinkData = require('./translink-data');
const translinkDataFormatter = require("./translink-data-formatter");
const translinkTrainDataFormatter = require("./translink-train-data-formatter");

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

restService.post('/bus', function(req, res) {
    options.stopCode = options.busStopCode;
    options.direction = options.busDirection;
    translinkData(options)
        .then(function(data){
            try {
                var busData = translinkDataFormatter(data);
                var speech = "";
                if (busData.length == 0) {
                    speech = "Sorry there are no busses at the moment";
                }
                else if(busData.length < 2) {
                    speech = `There is a ${speechHelper(busData[0])}`
                }
                else {
                    speech = `There is a ${speechHelper(busData[0])}, followed by ${displayTheWordAnother(busData)} ${speechHelper(busData[1])}, then a ${speechHelper(busData[2])}`;
                }
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
            catch (err){
                return res.json({
                    speech: err.message,
                    displayText: err.message,
                    source: 'webhook-echo-sample'
                });
            }
        });
});

restService.post('/train', function(req, res) {
    options.stopCode = options.trainStopCode;
    options.direction = options.trainDirection;
    translinkData(options)
        .then(function(data){
            try {
                var trainData = translinkTrainDataFormatter(data);
                if (trainData.length == 0) {
                    speech = "Sorry there are no trains at the moment";
                }
                else if(trainData.length < 2) {
                    speech = `There is a ${trainData[0].service} departing at ${trainData[0].arrivingIn}`
                }
                else {
                    var speech = `There is a ${trainData[0].service} departing in ${trainData[0].arrivingIn} minutes, followed by ${trainData[1].service} departing in ${trainData[1].arrivingIn} minutes followed by ${trainData[2].service} departing in ${trainData[2].arrivingIn} minutes`;
                }
                return res.json({
                    speech: speech,
                    displayText: speech,
                    source: 'webhook-echo-sample'
                });
            }
            catch (err){
                var speech = err.message;
                console.log(err);
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
