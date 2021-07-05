import { combineReducers } from 'redux';
import  admin from './auth';
import role from './role';

export default combineReducers({
    admin,
    role
});