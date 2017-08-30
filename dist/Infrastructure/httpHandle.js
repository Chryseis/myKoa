'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/30.
 */
var http = require('http');

var host = '192.168.1.32';
var port = '1023';

var httpRequest = function httpRequest(ctx) {
    debugger;
    delete ctx.request.header.host;
    var options = {
        host: host,
        port: port,
        path: ctx.request.url.substr(4, ctx.request.url.length),
        method: ctx.request.method,
        headers: ctx.request.header
    };

    console.log(options);

    var req = http.request(options, function (res) {
        var body = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            console.log('chunk', chunk);
            body = chunk;
        });

        res.on('end', function () {
            console.log(ctx, body);
            //ctx.type=res.headers['content-type'];
            ctx.body = body;
        });
    });

    ctx.request.body && req.write(ctx.request.body);
    req.end();
};

var getHandle = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return httpRequest(ctx);

                    case 2:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getHandle(_x) {
        return _ref.apply(this, arguments);
    };
}();

var postHandle = function postHandle(ctx) {};

var putHandle = function putHandle(ctx) {};

var deleteHandle = function deleteHandle(ctx) {};

module.exports = {
    getHandle: getHandle,
    postHandle: postHandle,
    putHandle: putHandle,
    deleteHandle: deleteHandle
};
//# sourceMappingURL=httpHandle.js.map