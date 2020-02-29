import React, { useCallback } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery, put as _put } from 'redux-saga/effects';

let _sagaMiddleware = createSagaMiddleware();

const genericReducer = (state = {}, action) => {

    switch (action.type) {
        case 'set':
            state[action.key] = action.value;
            return state;
        default: return state;
    }
}

const combination = () => ({ reducers: genericReducer });
const devToolsConfiguration = () => window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const sagaConfiguration = () => applyMiddleware(_sagaMiddleware = createSagaMiddleware())(createStore);

const store = () => createStore(combineReducers(combination()));
const storeDevTools = () => createStore(combineReducers(combination()), devToolsConfiguration());
const storeSaga = () => sagaConfiguration()(combineReducers(combination()));
const storeSagaDevTools = () => sagaConfiguration()(combineReducers(combination()), devToolsConfiguration());

const _dispatchers = {};

export const Container = ({ children, sagas = {}, devtools }) => {

    const provider = React.createElement(Provider, {
        store: sagas && devtools ? storeSagaDevTools() :
            sagas ? storeSaga() :
                devtools ? storeDevTools() :
                    store
    }, children);

    const watchers = [];
    Object.keys(sagas).forEach(key => {
        const saga = sagas[key];
        _dispatchers[key] = ({ type: key });

        function* watch() {
            yield takeEvery(key, saga);
        }

        watchers.push(watch());
    });

    function* root() {
        yield all(watchers);
    }

    _sagaMiddleware.run(root);

    return provider;
};

export const useReducers = (...keys) => {
    const state = useSelector(state => {
        const reducers = {};
        keys.forEach(key => {
            if (state) {
                reducers[key] = state.reducers[key];
            }
        });
        return reducers;
    });

    return state;
};

export const useDispatchers = () => {
    const dispatch = useDispatch();
    const dispatchers = {};

    if (_dispatchers !== {}) {
        Object.keys(_dispatchers).forEach(key => {
            dispatchers[key] = useCallback(payload => {
                dispatch({ ..._dispatchers[key], payload });
            }, []);
        });
    }

    return {
        apply: (key, value) => dispatch(set(key, value)),
        ...dispatchers
    };
}

export const sagaMiddleware = _sagaMiddleware;
export const set = (key, value) => ({ type: 'set', key, value });
export const dispatch = _put;

export default {
    Container,
    useReducers,
    sagaMiddleware: _sagaMiddleware,
    set,
    dispatch: _put
};