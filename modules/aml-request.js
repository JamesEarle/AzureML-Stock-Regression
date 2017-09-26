let req = require("request");
let priv = require('../private/index');

const link = "https://ussouthcentral.services.azureml.net/subscriptions/b7f8d76ba14c463397b1285b301edeec/services/06be9653dda84eed93fa99397c5f637c/execute?api-version=2.0&format=swagger";
const amlApiKey = priv.amlApiKey;

let promiseFunction = (options) => {
    return new Promise((resolve, reject) => {
        req(options, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                resolve(body);
            } else {
                reject(res.statusCode);
            }
        });
    });
}

exports.makeRequest = (vals) => {
    let data = {
        "Inputs": {
            "input1":
            [
                {
                    'timestamp': "",
                    'open': vals['open'],
                    'high': vals['high'],
                    'low': vals['low'],
                    'close': vals['close'],
                    'volume': vals['volume']
                }
            ],
        },
        "GlobalParameters": {}
    }
    let del = JSON.stringify(data);
    const options = {
        uri: link,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + amlApiKey,
        },
        body: del
    }
    return promiseFunction(options).then(results => {
        return results;
    });
}