'use strict';
const fetch = require('cross-fetch');

class MwrClient {
    constructor(conf) {
        let scheme = conf.https ? "https://" : "http://";
        let host = conf.host || "localhost";
        let port = conf.port || 6495;
        let endpoint = conf.endpoint || "mwr";
        this.base_url = scheme + host + (port === 80 ? "" : (":" + port)) + "/" + endpoint + "/";
        return new Proxy(this, this);
    }

    get(target, prop) {
        let base_url = this.base_url;
        return function () {
            let postData = JSON.stringify({param: Array.from(arguments)});
            return new Promise((resolve, reject) => {
                fetch(base_url + prop, {
                        method: "post", headers: {'Content-Type': 'application/json'}, body: postData
                    }
                ).then(res => {
                    res.json().then(r => {
                        resolve(r.result);
                    }).catch(e => {
                        reject(e);
                    });
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}

module.exports = MwrClient;
