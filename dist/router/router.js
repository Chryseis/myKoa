'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by AllenFeng on 2017/8/21.
 */
var fs = require('fs');

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

var router = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var view, html;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        view = 'index.html';
                        _context.t0 = url;
                        _context.next = _context.t0 === '/' ? 4 : _context.t0 === '/index' ? 6 : _context.t0 === '/todo' ? 8 : _context.t0 === '/404' ? 10 : _context.t0 === "/model" ? 12 : 13;
                        break;

                    case 4:
                        view = 'index.html';
                        return _context.abrupt('break', 14);

                    case 6:
                        view = 'index.html';
                        return _context.abrupt('break', 14);

                    case 8:
                        view = 'todo.html';
                        return _context.abrupt('break', 14);

                    case 10:
                        view = '404.html';
                        return _context.abrupt('break', 14);

                    case 12:
                        view = 'model.json';

                    case 13:
                        return _context.abrupt('break', 14);

                    case 14:
                        _context.next = 16;
                        return render(view);

                    case 16:
                        html = _context.sent;
                        return _context.abrupt('return', html);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function router(_x) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = router;
//# sourceMappingURL=router.js.map