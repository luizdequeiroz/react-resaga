import { useDispatch } from 'react-redux';
import { put } from 'redux-saga/effects';
import createAction from './createActions';

const useApply = () => {
    const dispatch = useDispatch();

    return (key, value) => dispatch(createAction(key, value));
};

export const apply = (key, value) => put(createAction(key, value));

export default useApply;