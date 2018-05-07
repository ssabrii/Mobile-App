import { CREATE_ACCOUNT_NEXT_PRESSED } from './actionTypes';

export const createAccount = ({
    firstName, lastName, email, userWantsPromo
}) => ({
    type: CREATE_ACCOUNT_NEXT_PRESSED,
    params: {
        firstName, lastName, email, userWantsPromo
    }
});
