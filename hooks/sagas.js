import { _dispatchers } from "../config";
import { useDispatch } from "react-redux";

const useSagas = () => {
    if (JSON.stringify(_dispatchers) !== '{}') {
        const dispatch = useDispatch();

        const dispatchers = {};
        Object.keys(_dispatchers).forEach(key => {
            dispatchers[key] = (payload, callback = null) => {
                dispatch({ ..._dispatchers[key], payload, callback });
            };
        });

        return dispatchers;
    } else throw new Error('Saga use is not enabled');
};

export default useSagas;