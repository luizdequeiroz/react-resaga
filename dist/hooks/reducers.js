"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require("react-redux");

var useReducers = function useReducers() {
    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
    }
    
    var reducers = {};
    keys.forEach(function (key) {
        reducers[key] = (0, _reactRedux.useSelector)(function (state) {
            return state.reducers[key];
        });
    });

    return reducers;
};

exports.default = useReducers;