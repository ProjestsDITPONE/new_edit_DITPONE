import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import dataReducer from './data.reducer';
import globalReducer from './global.reducer';
import userReducer from './user.reducer';

const AppReducer = combineReducers({
  authReducer,
  dataReducer,
  globalReducer,
  userReducer,
});
export default AppReducer;
