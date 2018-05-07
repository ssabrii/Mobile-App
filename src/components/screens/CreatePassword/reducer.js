import immutable from 'immutable';
import { PASSWORD_CREATED } from './actionTypes';


export default function createPasswordReducer(state = immutable.fromJS({}), action) {
    switch (action.type) {
    case PASSWORD_CREATED:
        return state.set('password', action.params.password);

    default:
        return state;
    }
}
