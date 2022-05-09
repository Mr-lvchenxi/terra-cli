"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./index"));

_index["default"].install = function (Vue) {
  Vue.component(_index["default"].name, _index["default"]);
};

var _default = _index["default"];
exports["default"] = _default;