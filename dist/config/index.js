'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._dispatchers = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _effects = require('redux-saga/effects');

var _injections = require('./injections');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dispatchers = exports._dispatchers = {};

var Container = function Container(_ref) {
    var _marked3 = /*#__PURE__*/regeneratorRuntime.mark(root);

    var children = _ref.children,
        _ref$sagas = _ref.sagas,
        sagas = _ref$sagas === undefined ? {} : _ref$sagas,
        devtools = _ref.devtools;


    var provider = _react2.default.createElement(_reactRedux.Provider, {
        store: sagas && devtools ? (0, _injections.storeSagaDevTools)() : sagas ? (0, _injections.storeSaga)() : devtools ? (0, _injections.storeDevTools)() : (0, _injections.store)()
    }, children);

    var watchers = [];
    Object.keys(sagas).forEach(function (key) {
        var _marked = /*#__PURE__*/regeneratorRuntime.mark(saga),
            _marked2 = /*#__PURE__*/regeneratorRuntime.mark(watch);

        function saga(action) {
            var sagaReturn;
            return regeneratorRuntime.wrap(function saga$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return sagas[key](action.payload);

                        case 2:
                            sagaReturn = _context.sent;

                            action.callback && action.callback(sagaReturn, action);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _marked, this);
        }

        _dispatchers[key] = { type: key };

        function watch() {
            return regeneratorRuntime.wrap(function watch$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.takeEvery)(key, saga);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _marked2, this);
        }

        watchers.push(watch());
    });

    function root() {
        return regeneratorRuntime.wrap(function root$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return (0, _effects.all)(watchers);

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _marked3, this);
    }

    _injections.sagaMiddleware.run(root);

    return provider;
};

exports.default = Container;