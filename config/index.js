import React from 'react';
import { Provider } from 'react-redux';
import { all, takeEvery } from 'redux-saga/effects';
import { storeSagaDevTools, storeSaga, storeDevTools, sagaMiddleware } from './injections';

export const _dispatchers = {};

const Container = ({ children, sagas = {}, devtools }) => {

    const provider = React.createElement(Provider, {
        store: sagas && devtools ? storeSagaDevTools() :
            sagas ? storeSaga() :
                devtools ? storeDevTools() :
                    store
    }, children);

    const watchers = [];
    Object.keys(sagas).forEach(key => {

        function* saga(action) {
            const sagaReturn = yield sagas[key](action.payload);
            action.callback && action.callback(sagaReturn, action);
        }

        _dispatchers[key] = ({ type: key });

        function* watch() {
            yield takeEvery(key, saga);
        }

        watchers.push(watch());
    });

    function* root() {
        yield all(watchers);
    }

    sagaMiddleware.run(root);

    return provider;
};

export default Container;