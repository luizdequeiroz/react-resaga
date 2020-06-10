'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeSagaDevTools = exports.storeSaga = exports.storeDevTools = exports.store = exports.sagaConfiguration = exports.devToolsConfiguration = exports.combination = exports.sagaMiddleware = undefined;

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _genericReducer = require('./genericReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sagaMiddleware = exports.sagaMiddleware = (0, _reduxSaga2.default)();

var combination = exports.combination = function combination() {
  return { reducers: _genericReducer.genericReducer };
};
var devToolsConfiguration = exports.devToolsConfiguration = function devToolsConfiguration() {
  return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
};
var sagaConfiguration = exports.sagaConfiguration = function sagaConfiguration() {
  return (0, _redux.applyMiddleware)(exports.sagaMiddleware = sagaMiddleware = (0, _reduxSaga2.default)())(_redux.createStore);
};

var store = exports.store = function store() {
  return (0, _redux.createStore)((0, _redux.combineReducers)(combination()));
};
var storeDevTools = exports.storeDevTools = function storeDevTools() {
  return (0, _redux.createStore)((0, _redux.combineReducers)(combination()), devToolsConfiguration());
};
var storeSaga = exports.storeSaga = function storeSaga() {
  return sagaConfiguration()((0, _redux.combineReducers)(combination()));
};
var storeSagaDevTools = exports.storeSagaDevTools = function storeSagaDevTools() {
  return sagaConfiguration()((0, _redux.combineReducers)(combination()), devToolsConfiguration());
};