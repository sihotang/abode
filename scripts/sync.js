"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawnSync = exports.execSync = void 0;

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SEPARATOR = process.platform === 'win32' ? ';' : ':';

const envModules = _objectSpread({}, process.env);

envModules.PATH = _path.default.resolve('../../node_modules/.bin') + SEPARATOR + envModules.PATH;

const exec = function () {
  function exec(command, name, cwd = process.cwd()) {
    return (0, _child_process.execSync)(command, {
      cwd,
      env: envModules,
      stdio: 'inherit'
    });
  }

  return exec;
}();

exports.execSync = exec;

const spawn = function () {
  function spawn(command, args = [], cwd = process.cwd()) {
    return (0, _child_process.spawnSync)(command, args, {
      cwd,
      env: envModules,
      stdio: 'inherit'
    }).on('error', process.exit);
  }

  return spawn;
}();

exports.spawnSync = spawn;