import { useDispatch } from "react-redux";
import createAction from "./createActions";
import { put } from "redux-saga/effects";

const useApply = () => {
    const dispatch = useDispatch();

    return (key, value) => dispatch(createAction(key, value));
};

export const apply = (key, value) => put(createAction(key, value));

export default useApply;