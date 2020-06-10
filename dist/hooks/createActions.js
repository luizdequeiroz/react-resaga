'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../config/actions');

var createAction = function createAction(key, value) {
  return { type: _actions.APPLY, key: key, value: value };
};

exports.default = createAction;