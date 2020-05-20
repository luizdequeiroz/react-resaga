import { useSelector } from "react-redux";

const useReducers = (...keys) => {

    const reducers = {};
    keys.forEach(key => {
        reducers[key] = useSelector(state => state.reducers[key]);
    });

    return reducers;
};

export default useReducers;