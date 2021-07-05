import { LIST_BANNER,ERROR } from '../actions/banner';

const  banner = (store={list:[]}, action) => {
  switch (action.type) {
    case LIST_BANNER:        
        const {data}=action;
        return Object.assign({}, store,data);
    case ERROR:
        return action;
    default: return store;
  }
};

export default banner