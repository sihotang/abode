"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isProduction", {
  enumerable: true,
  get: function () {
    function get() {
      return _environment.isProduction;
    }

    return get;
  }()
});
Object.defineProperty(exports, "isVerbose", {
  enumerable: true,
  get: function () {
    function get() {
      return _environment.isVerbose;
    }

    return get;
  }()
});
Object.defineProperty(exports, "packaged", {
  enumerable: true,
  get: function () {
    function get() {
      return _environment.packaged;
    }

    return get;
  }()
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    function get() {
      return _Logger.default;
    }

    return get;
  }()
});
Object.defineProperty(exports, "Timer", {
  enumerable: true,
  get: function () {
    function get() {
      return _Timer.default;
    }

    return get;
  }()
});

var _environment = require("./environment");

var _Logger = _interopRequireDefault(require("./Logger"));

var _Timer = _interopRequireDefault(require("./Timer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }