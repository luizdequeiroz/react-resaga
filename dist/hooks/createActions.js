import { APPLY } from '../config/actions';

const createAction = (key, value) => ({ type: APPLY, key, value });

export default createAction;