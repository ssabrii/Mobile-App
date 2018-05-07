import { combineReducers } from 'redux';
import createPasswordReducer from '../../components/screens/CreatePassword/reducer';
import createAccountReducer from '../../components/screens/CreateAccount/reducer';


const rootReducer = combineReducers({
    user: combineReducers({ account: createAccountReducer, credentials: createPasswordReducer })
});

export default rootReducer;
