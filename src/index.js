import _Container from './config';
import _useReducers from './hooks/reducers';
import _useSagas from './hooks/sagas';
import _useApply, { apply as _apply } from './hooks/apply';

export const Container = _Container;

export const useReducers = _useReducers;
export const useSagas = _useSagas;
export const useApply = _useApply;

export const apply = _apply;

export default {
    Container,
    apply,
    useReducers,
    useApply,
    useSagas
};