const cheerio = require('cheerio');

var extractInfo = (row) => {
    //sample data: 375 West 9 mins .
    let infoArray = row.split(" ",4);

    return {
        service: infoArray[0],
        arrivingIn: infoArray[2]
    }
};

var formatTranslinkData = (data)=> {
	var $ = cheerio.load(data);
    var busData = [];
    $(".clickable-row").each(function(){
      busData.push(extractInfo($(this).attr("aria-label")));
    })
    return busData;
}

module.exports = formatTranslinkData;