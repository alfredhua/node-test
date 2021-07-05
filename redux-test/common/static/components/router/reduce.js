import { ERROR,SUCCESS } from './action';
import { combineReducers } from 'redux';

var init={
  router:{
    user_auth_list:[]
  }
}

 const  auth_router = (store=init, action) => {
  switch (action.type) {
    case SUCCESS: 
        return  Object.assign({},store,{router:{user_auth_list:action.data}});
    case ERROR:
        return action;
    default: return store;
  }
};


export default combineReducers({
    auth_router
});
