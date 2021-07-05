import { GET_ROLE,ERROR,SUCCESS,CLOSE,LIST_ROLE,CHANGE } from './action';

var init={
  e_role:{
    authority_list:[],
    result_visible:false,
    info:{
      name:null,
      comment:null,
      auth_list:[],
    }
  },
  l_role:{
    list:[],
  }
}

export const l_role = (store=init.l_role, action) => {
  switch (action.type) {
    case LIST_ROLE:
      return  Object.assign({}, store,action.data);
    default: return store;
  }
}


export const e_role = (store=init.e_role, action) => {
  switch (action.type) {
    case GET_ROLE: 
        let {info}=action.data;
        if(info){
          return  Object.assign({}, store,{authority_list:action.data.authority_list,info,result_visible:false});
        }else{
          return  Object.assign({}, store,{authority_list:action.data.authority_list,info:init.e_role.info,result_visible:false});
        }
    case CHANGE:
        var new_info=Object.assign({},store.info);
        new_info[action.item]=action.value;
        return Object.assign({}, store,{info:new_info});
    case ERROR:
        return Object.assign({}, store,action.data,{result_visible:true});
    case SUCCESS:
        return Object.assign({}, store,action.data,{result_visible:true});
   case CLOSE:
        return Object.assign({}, store,{...init.e_role});
    default:
        return store;
  }
};