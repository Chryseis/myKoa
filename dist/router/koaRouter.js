'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/29.
 */
var fs = require('fs');
var Router = require('koa-router');
var appData = require('../data/data.json');

var _require = require('../Infrastructure/httpHandle'),
    httpHandle = _require.httpHandle;

var koaBody = require('koa-body')({
    multipart: true
});

//const body=require('koa-better-body')();
//const body = require('koa-better-body')();

var render = function render(page) {
    return new Promise(function (resolve, reject) {
        var viewUrl = './view/' + page;
        fs.readFile(viewUrl, "binary", function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

var api = new Router();

// api.get('*', httpHandle)
//     .post('*',koaBody, httpHandle)
//     .put('*',koaBody, httpHandle).del('*',koaBody, httpHandle);

api.get('/goods', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.body = {
                            errno: 0,
                            data: appData.goods
                        };

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}()).get('/seller', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx.body = {
                            errno: 0,
                            data: appData.seller
                        };

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}()).get('/ratings', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        ctx.body = {
                            errno: 0,
                            data: appData.ratings
                        };

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x3) {
        return _ref3.apply(this, arguments);
    };
}());

var common = new Router();
common.get('*', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return render('index.html');

                    case 2:
                        ctx.body = _context4.sent;

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x4) {
        return _ref4.apply(this, arguments);
    };
}());

var router = new Router();
router.use('/api', api.routes(), api.allowedMethods());
router.use('/', common.routes(), common.allowedMethods());

module.exports = router;
//# sourceMappingURL=koaRouter.js.map