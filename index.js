import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { all, takeEvery, put } from 'redux-saga/effects';

const APPLY = 'apply';

let sagaMiddleware = createSagaMiddleware();

const genericReducer = (state = {}, action) => {

    switch (action.type) {
        case APPLY:
            state[action.key] = action.value;
            return state;
        default: return state;
    }
}

const combination = () => ({ reducers: genericReducer });
const devToolsConfiguration = () => window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const sagaConfiguration = () => applyMiddleware(sagaMiddleware = createSagaMiddleware())(createStore);

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

    sagaMiddleware.run(root);

    return provider;
};

export const useReducers = (...keys) => {

    const reducers = {};
    keys.forEach(key => {
        reducers[key] = useSelector(state => state.reducers[key]);
    });

    return reducers;
};

export const useSagas = () => {
    if (JSON.stringify(_dispatchers) !== '{}') {
        const dispatch = useDispatch();

        const dispatchers = {};
        Object.keys(_dispatchers).forEach(key => {
            dispatchers[key] = (payload) => {
                dispatch({ ..._dispatchers[key], payload });
            };
        });

        return dispatchers;
    } else throw new Error('Saga use is not enabled');
};

export const useApply = () => {
    const dispatch = useDispatch();

    return (key, value) => dispatch(createAction(key, value));
};

export const createAction = (key, value) => ({ type: APPLY, key, value });
export const apply = (key, value) => put(createAction(key, value));

export default {
    Container,
    useReducers,
    useSagas,
    useApply,
    createAction,
    apply
};