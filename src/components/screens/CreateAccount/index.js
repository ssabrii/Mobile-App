import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import CreateAccount from '../../templates/CreateAccount';
import { createAccount } from './actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    onNextPress: ({
        firstName, lastName, email, userWantsPromo
    }) => {
        dispatch(createAccount({
            firstName, lastName, email, userWantsPromo
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CreateAccount));
