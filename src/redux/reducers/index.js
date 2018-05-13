import { combineReducers } from 'redux';
import createPasswordReducer from '../../components/screens/CreatePassword/reducer';
import createAccountReducer from '../../components/screens/CreateAccount/reducer';
import { payment } from '../common/reducers';

const rootReducer = combineReducers({
    user: combineReducers({ account: createAccountReducer, credentials: createPasswordReducer }),
    paymentInfo: payment
});

export default rootReducer;
