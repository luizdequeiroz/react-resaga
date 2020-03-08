import { APPLY } from "./actions";

export const genericReducer = (state = {}, action) => {

    switch (action.type) {
        case APPLY:
            state[action.key] = action.value;
            return state;
        default: return state;
    }
};