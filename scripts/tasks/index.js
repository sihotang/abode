"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "tscompile", {
  enumerable: true,
  get: function () {
    function get() {
      return _tscompile.default;
    }

    return get;
  }()
});
Object.defineProperty(exports, "tslint", {
  enumerable: true,
  get: function () {
    function get() {
      return _tslint.default;
    }

    return get;
  }()
});

var _tscompile = _interopRequireDefault(require("./tscompile"));

var _tslint = _interopRequireDefault(require("./tslint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }