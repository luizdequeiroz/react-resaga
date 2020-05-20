import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { genericReducer } from './genericReducer';

export let sagaMiddleware = createSagaMiddleware();

export const combination = () => ({ reducers: genericReducer });
export const devToolsConfiguration = () => window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export const sagaConfiguration = () => applyMiddleware(sagaMiddleware = createSagaMiddleware())(createStore);

export const store = () => createStore(combineReducers(combination()));
export const storeDevTools = () => createStore(combineReducers(combination()), devToolsConfiguration());
export const storeSaga = () => sagaConfiguration()(combineReducers(combination()));
export const storeSagaDevTools = () => sagaConfiguration()(combineReducers(combination()), devToolsConfiguration());