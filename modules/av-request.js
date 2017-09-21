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

exports.getTodaysValues = (body) => {
    console.log("ya a body here broh");
}