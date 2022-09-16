"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function loadScript() {
  return new Promise(function (resolve, reject) {
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://static-growth-fe.saasp.vdyoo.com/growthFeProject/growthFeSource/growthJsLibrary/talSensor_v2.1.6.js";

    window.onload = function () {
      document.body.appendChild(oScript);

      oScript.onload = function () {
        if (window.XesAnalytics) {
          resolve(window.XesAnalytics);
        }
      };

      oScript.onerror = function (err) {
        reject(err);
      };
    };
  });
}

var Xeslog = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj) {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loadScript();

          case 2:
            res = _context.sent;
            return _context.abrupt("return", new res(obj));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Xeslog(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = Xeslog;
exports["default"] = _default;