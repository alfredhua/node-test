import { combineReducers } from 'redux';
import { l_admin,e_admin} from './admin/reducer';
import { l_role,e_role} from './role/reducer';

export default combineReducers({
    l_admin,
    e_admin,
    l_role,
    e_role
});