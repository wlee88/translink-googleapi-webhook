const cheerio = require('cheerio');
const _ = require('underscore');

var extractInfo = (arrivingIn, service) => {
    if (service == '') {
        service = "unknown";
    }
    var arrivingIn = arrivingIn.trim().split(" ",1)[0];;
    if (arrivingIn == '') {
        arrivingIn = "unknown";
    }
    return {
        service: service,
        arrivingIn: arrivingIn.toLowerCase()
    }
};

var formatTranslinkTrainData = (data)=> {
	var $ = cheerio.load(data);
    var trainData = [];
    $(".clickable-row").each(function(){
      trainData.push(extractInfo($(this).find(".depart-estimate .countdown").text(), $(this).find(".service-name").text()));
    });
    return _.reject(trainData, function(data) { return data.arrivingIn == 'unknown' || data.arrivingIn ==  'skipped'});
}

module.exports = formatTranslinkTrainData;