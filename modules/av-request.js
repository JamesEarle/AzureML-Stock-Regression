let req = require("request"); 
let priv = require('../private/index');

let key = priv.apiKey;
let uri;

// exports.symbol = "";

let p = new Promise((resolve, reject) => {
    // console.log(uri);
    // req.get(uri, (err, res, body) => {
    //     if (!err && res.statusCode == 200) {
    //         resolve(body);
    //     } else {
    //         reject(res.statusCode)
    //     }
    // }); 
});

let promiseFunction = (uri) => {
    return new Promise((resolve, reject) => {
        req.get(uri, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                // console.log(body.substring(0, 500));
                resolve(body);
            } else {
                reject(res.statusCode);
            }
        }); 
    })
}

exports.makeRequest = (symbol) => {
    uri = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + key;
    return promiseFunction(uri).then(result => {
        return result;
    });
}

exports.getTodaysValues = (json) => {
    result = json["Time Series (Daily)"];
    
    if(!result) return undefined;

    let date = new Date();
    let dayOfMonth = date.getDate().toString().length == 2 ? date.getDate() : "0" + date.getDate().toString();
    let month = date.getMonth().toString().length == 2 ? date.getMonth() : "0" + (date.getMonth() + 1).toString();
    let formattedDate = date.getFullYear() + "-" + month + "-" + dayOfMonth;

    let today = result[formattedDate];

    let obj = {
        "open"  : today["1. open"],
        "high"  : today["2. high"],
        "low"   : today["3. low"],
        "volume": today["5. volume"]
    }
    return obj;
}