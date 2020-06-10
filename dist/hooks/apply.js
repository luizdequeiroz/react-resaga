"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apply = undefined;

var _reactRedux = require("react-redux");

var _createActions = require("./createActions");

var _createActions2 = _interopRequireDefault(_createActions);

var _effects = require("redux-saga/effects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useApply = function useApply() {
    var dispatch = (0, _reactRedux.useDispatch)();

    return function (key, value) {
        return dispatch((0, _createActions2.default)(key, value));
    };
};

var apply = exports.apply = function apply(key, value) {
    return (0, _effects.put)((0, _createActions2.default)(key, value));
};

exports.default = useApply;