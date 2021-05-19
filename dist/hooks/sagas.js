"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("../config");

var _reactRedux = require("react-redux");

var useSagas = function useSagas() {
    if (JSON.stringify(_config._dispatchers) !== '{}') {
        var dispatch = (0, _reactRedux.useDispatch)();

        var dispatchers = {};
        Object.keys(_config._dispatchers).forEach(function (key) {
            dispatchers[key] = function (payload) {
                var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                // dispatch({ ..._dispatchers[key], payload, callback });
                dispatch({ ..._config._dispatchers[key], payload: payload, callback: callback });
            };
        });

        return dispatchers;
    } else throw new Error('Saga use is not enabled');
};

exports.default = useSagas;