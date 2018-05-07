import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import Terms from '../../templates/Terms';
import { register } from '../../../utils/requester';
import { domainPrefix } from '../../../config';

const mapStateToProps = ({ user }) => ({
    firstName: user.account.get('firstName'),
    lastName: user.account.get('lastName'),
    email: user.account.get('email'),
    userWantsPromo: user.account.get('userWantsPromo'),
    password: user.credentials.get(['credentials', 'password'])

});
const mapDispatchToProps = dispatch => ({
    onAcceptPress: async ({ firstName, lastName, email, userWantsPromo, password }) => {
        const user = { firstName, lastName, email, userWantsPromo, password };
        const checkResponse = (res) => {
            if (!res.success) {
                // TODO: dispatch an action to notify the user about the error
                dispatch();
                throw new Error(`Registration failed with code ${res.response.status}`);
            }
            return res;
        };
        const saveToAsyncStorage = (res) => {
            // TODO: Get first name + last name from response included with Authorization token (Backend)
            AsyncStorage.setItem(`${domainPrefix}.auth.username`, email);
            return res;
        };
        return register(user)
            .then(checkResponse)
            .then(saveToAsyncStorage)
            .catch((err) => {
                console.error(err);
            });
    }
});
const mergeProps = (stateProps, dispatchProps) => {
    const {
        firstName,
        lastName,
        email,
        userWantsPromo,
        password
    } = stateProps;
    const { onAcceptPress } = dispatchProps;
    return {
        onAcceptPress: async () => onAcceptPress({ firstName, lastName, email, userWantsPromo, password })
    };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withNavigation(Terms));
