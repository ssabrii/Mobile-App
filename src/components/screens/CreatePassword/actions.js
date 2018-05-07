import { PASSWORD_CREATED } from './actionTypes';

export const createPassword = ({ password }) => ({
    type: PASSWORD_CREATED,
    params: { password }
});
