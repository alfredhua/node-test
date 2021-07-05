import { LIST_AUTHORITY,ERROR,SUCCESS,CLOSE } from '../actions/role';

var init={
  authority_list:[],
  result_visible:false,
  name:null,
}

const  role = (store=init, action) => {
  switch (action.type) {
    case LIST_AUTHORITY: 
        return  Object.assign({}, store,{authority_list:action.data});;
    case ERROR:
        return Object.assign({}, store,action.data,{result_visible:true});;
    case SUCCESS:
        return Object.assign({}, store,action.data,{result_visible:true});
    case CLOSE:
        return Object.assign({}, store,{result_visible:false});
    default: return store;
  }
};

export default role;