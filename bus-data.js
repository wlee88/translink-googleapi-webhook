// POST REQUEST 
var rp = require("request-promise");
var cheerio = require("cheerio");


var html = function(options) {
    var headers = {
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var defaults = {
        url: 'https://jp.translink.com.au//plan-your-journey/stops/stopinformationupdate',
        method: 'POST',
        headers: headers,
        form: {'id': options.stopCode, 'kind': 'realtime', 'direction' : options.direction}
    }

    var options = Object.assign(defaults, options)
    return rp(options);
}



// RETURN 

module.exports = html;