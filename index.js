import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { reducer as reducerForms } from 'redux-form';
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
const reduxFormConfiguration = () => combineReducers({ ...combination(), reducerForms });
const sagaConfiguration = () => applyMiddleware(_sagaMiddleware = createSagaMiddleware())(createStore);

const store = () => createStore(combineReducers(combination()));
const storeDevTools = () => createStore(combineReducers(combination()), devToolsConfiguration());
const storeReduxForm = () => createStore(reduxFormConfiguration());
const storeReduxFormDevTools = () => createStore(reduxFormConfiguration(), devToolsConfiguration());
const storeSaga = () => sagaConfiguration()(combineReducers(combination()));
const storeSagaDevTools = () => sagaConfiguration()(combineReducers(combination()), devToolsConfiguration());
const storeReduxFormSaga = () => sagaConfiguration()(reduxFormConfiguration());
const storeReduxFormSagaDevTools = () => sagaConfiguration()(reduxFormConfiguration(), devToolsConfiguration());

const _dispatchers = {};

export const Container = ({ children, reduxForm, sagas, devtools }) => {

    const provider = React.createElement(Provider, {
        store: reduxForm && sagas && devtools ? storeReduxFormSagaDevTools()
            : reduxForm && sagas ? storeReduxFormSaga()
                : sagas && devtools ? storeSagaDevTools()
                    : sagas ? storeSaga()
                        : reduxForm && devtools ? storeReduxFormDevTools()
                            : reduxForm ? storeReduxForm()
                                : devtools ? storeDevTools()
                                    : store
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
}

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

    const dispatch = useDispatch();
    state.set = (key, value) => dispatch({ type: 'set', key, value });
    Object.keys(_dispatchers).forEach(key => {
        state[key] = (payload) => {
            dispatch({ ..._dispatchers[key], payload });
        };
    });

    return state;
}

export const sagaMiddleware = _sagaMiddleware;
export const put = _put;

export default {
    Container,
    useReducers,
    sagaMiddleware: _sagaMiddleware
};