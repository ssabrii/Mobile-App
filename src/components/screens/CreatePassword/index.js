import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import CreatePassword from '../../templates/CreatePassword';
import { createPassword } from './actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    onNextPress: ({ password }) => {
        dispatch(createPassword({ password }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CreatePassword));
