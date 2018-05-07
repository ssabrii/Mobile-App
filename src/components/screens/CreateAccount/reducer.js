import immutable from 'immutable';
import { CREATE_ACCOUNT_NEXT_PRESSED } from './actionTypes';

export default function createAccountReducer(state = immutable.fromJS({}), action) {
    switch (action.type) {
    case CREATE_ACCOUNT_NEXT_PRESSED:
        return state
            .set('firstName', action.params.firstName)
            .set('lastName', action.params.lastName)
            .set('email', action.params.email)
            .set('userWantsPromo', action.params.userWantsPromo);

    default:
        return state;
    }
}
