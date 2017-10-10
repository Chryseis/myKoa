'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/30.
 */
var http = require('http');
var query = require('querystring');
var fs = require('fs');

var host = '121.40.30.204';
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
        var requestBody = '',
            body = void 0,
            head = void 0,
            chunks = [],
            fileFields = void 0,
            files = void 0,
            boundaryKey = void 0,
            boundary = void 0,
            endData = void 0,
            filesLength = void 0,
            totallength = 0;

        if (ctx.request.body) {
            console.log(ctx.request.header['content-type']);
            if (ctx.request.header['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                requestBody = query.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody);
            } else if (ctx.request.header['content-type'].indexOf('application/json') > -1) {
                requestBody = JSON.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody);
            } else if (ctx.request.header['content-type'].indexOf('multipart/form-data') > -1) {
                fileFields = ctx.request.body.fields;
                files = ctx.request.body.files;
                boundaryKey = Math.random().toString(16);
                boundary = '\r\n----' + boundaryKey + '\r\n';
                endData = '\r\n----' + boundaryKey + '--';
                filesLength = 0;

                Object.keys(fileFields).forEach(function (key) {
                    requestBody += boundary + 'Content-Disposition:form-data;name="' + key + '"\r\n\r\n' + fileFields[key];
                });

                Object.keys(files).forEach(function (key) {
                    requestBody += boundary + 'Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="' + key + '";filename="' + files[key].name + '"\r\nContent-Transfer-Encoding: binary\r\n\r\n';
                    filesLength += Buffer.byteLength(requestBody) + files[key].size;
                });

                options.headers['Content-Type'] = 'multipart/form-data; boundary=--' + boundaryKey;
                options.headers['Content-Length'] = filesLength + Buffer.byteLength(endData);
            } else {
                requestBody = JSON.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody);
            }
        }

        var req = http.request(options, function (res) {
            // res.on('data', (chunk) => {
            //     chunks.push(chunk);
            //     totallength += chunk.length;
            // })
            //
            // res.on('end', () => {
            //     body = Buffer.concat(chunks, totallength);
            //     head = res.headers;
            //     resolve({head, body});
            // })
            resolve(res);
        });

        ctx.request.body && req.write(requestBody);

        if (fileFields) {
            var filesArr = Object.keys(files);
            var uploadConnt = 0;
            filesArr.forEach(function (key) {
                var fileStream = fs.createReadStream(files[key].path);
                fileStream.on('end', function () {
                    fs.unlinkSync(files[key].path);
                    uploadConnt++;
                    if (uploadConnt == filesArr.length) {
                        req.end(endData);
                    }
                });
                fileStream.pipe(req, { end: false });
            });
        } else {
            req.end();
        }
    });
};

var httpHandle = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var content;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return httpRequest(ctx);

                    case 2:
                        content = _context.sent;

                        // ctx.type = content.head['content-type'];
                        // ctx.length = content.head['content-length'];
                        // ctx.body = content.body;
                        ctx.body = content;

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