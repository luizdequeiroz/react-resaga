"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.genericReducer = undefined;

var _actions = require("./actions");

var genericReducer = exports.genericReducer = function genericReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    switch (action.type) {
        case _actions.APPLY:
            state[action.key] = action.value;
            return state;
        default:
            return state;
    }
};