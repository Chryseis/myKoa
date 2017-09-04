'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/29.
 */
var fs = require('fs');
var Router = require('koa-router');

var _require = require('../Infrastructure/httpHandle'),
    httpHandle = _require.httpHandle;

var koaBody = require('koa-body')({
    multipart: true
});
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

api.get('*', httpHandle).post('*', koaBody, httpHandle).put('*', koaBody, httpHandle).del('*', koaBody, httpHandle);

var common = new Router();
common.get('*', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return render('index.html');

                    case 2:
                        ctx.body = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());

var router = new Router();
router.use('/api', api.routes(), api.allowedMethods());
router.use('/', common.routes(), common.allowedMethods());

module.exports = router;
//# sourceMappingURL=koaRouter.js.map