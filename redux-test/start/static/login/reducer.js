import { LOGIN,VERIFY,ERROR,CHANGE } from './action';
const init={
}

export const  login = (store=init, action) => {
  switch (action.type) {
    case VERIFY: 
        return  Object.assign({},store, action.data);
    case CHANGE: 
        let login=Object.assign({}, store);
        login[action.item]=action.value;
        return  Object.assign({}, {...login});
    case LOGIN:
        return  Object.assign({} , action.data);
    case ERROR:
        return  Object.assign({}, store,{...action.data});
    default: 
        return store;
  }
};
