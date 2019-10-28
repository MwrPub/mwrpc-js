'use strict';

const http = require("http");
const url = require('url');

class MwrServer {
    constructor(conf) {
        this.host = conf.host || "0.0.0.0";
        this.port = conf.port || 6495;
        this.endpoint = conf.endpoint || "mwr";
        this.allowed_origin = conf.allowed_origin || "*";
        this.rules = [];
        this.context = {};
    }

    func(f) {
        if (f.func && (typeof f.func) === 'function') {
            let endpoint = f.endpoint || this.endpoint;
            let name = f.name;
            this.rules.push({name: name, func: f.func, endpoint: endpoint});
        }
        return this;
    }

    run() {
        let that = this;
        http.createServer(((request, response) => {
            let url_array = url.parse(request.url).pathname.split('/');
            if (url_array[1] === '') {
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end('MwrServer is running.');
                return;
            }
            let allowed_origin;
            if (Array.isArray(this.allowed_origin)) {
                if (this.allowed_origin.includes('' + request.headers["origin"])) {
                    allowed_origin = request.headers["origin"];
                } else {
                    allowed_origin = '';
                }
            } else {
                allowed_origin = this.allowed_origin;
            }
            response.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': allowed_origin,
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Mwr-Ver',
            });
            for (let rule of that.rules) {
                if (rule.endpoint === url_array[1] && rule.name === url_array[2]) {
                    let body = [];
                    request.on('error', (err) => {
                        console.log(err);
                    }).on('data', (chunk) => {
                        body.push(chunk);
                    }).on('end', () => {
                        let request_body = Buffer.concat(body).toString() || '{}';
                        let request_info = JSON.parse(request_body);
                        let args = request_info['param'];
                        let result = rule.func.apply(that.context, args);
                        response.end(JSON.stringify({'result': result}));
                    });
                    return;
                }
            }
            response.end(JSON.stringify({"code": -1, "err": "method not exists"}));
        })).listen(this.port, this.host);
        console.log(`MWR 0.1.7\nServing MWR on ${this.host}:${this.port}\n(Press CTRL+C to quit)`)
    }
}

module.exports = MwrServer;
