import { LIST_ADMIN,EDIT_ADMIN,ERROR,SUCCESS,CLOSE } from './action';
var init={
  l_admin:{
  },
  e_admin:{
    role_list:[],
    result_visible:false
  }
}

export const  l_admin = (store=init.l_admin, action) => {
  switch (action.type) {
    case LIST_ADMIN: 
        return  Object.assign({}, store,action.data);
    case ERROR:
        return action;
    default: return store;
  }
};

export const e_admin =(store=init.e_admin, action) => {
  switch (action.type) {
    case EDIT_ADMIN: 
        if(action.data.admin){
          return  Object.assign({}, store,{...action.data});
        }else{
          return  Object.assign({}, store,{role_list:action.data.role_list,admin:{}});
        }
    case SUCCESS:
        return Object.assign({}, store,action.data,{result_visible:true});
    case CLOSE:
        return Object.assign({}, store,{...init.e_admin});
    case ERROR:
        return Object.assign({}, store,action.data,{result_visible:true});;
    default: return store;
  }
};