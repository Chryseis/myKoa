'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/30.
 */
var http = require('http');
var query = require('querystring');

var host = '192.168.1.32';
var port = '1023';

var httpRequest = function httpRequest(ctx) {
    return new Promise(function (resolve) {
        delete ctx.request.header.host;
        var options = {
            host: host,
            port: port,
            path: ctx.request.url.substr(4, ctx.request.url.length),
            method: ctx.request.method,
            headers: ctx.request.header
        };
        var requestBody = void 0;
        var body = void 0;

        if (ctx.request.header['content-type'] !== 'application/json') {
            requestBody = query.stringify(ctx.request.body);
        } else {
            requestBody = JSON.stringify(ctx.request.body);
        }
        options.headers['Content-Length'] = Buffer.byteLength(requestBody);

        console.log(options, query.stringify(ctx.request.body), ctx.request.body);

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                console.log('chunk', chunk);
                body = chunk;
                resolve(body);
            });

            res.on('end', function () {
                console.log('响应中已无数据。');
            });
        });

        ctx.request.body && req.write(requestBody);
        req.end();
    });
};

var httpHandle = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return httpRequest(ctx);

                    case 2:
                        body = _context.sent;

                        ctx.body = body;

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function httpHandle(_x) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    httpHandle: httpHandle
};
//# sourceMappingURL=httpHandle.js.map