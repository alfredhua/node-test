import { LIST_ADMIN,ERROR } from '../actions/admin';

const  admin = (store={}, action) => {
  switch (action.type) {
    case LIST_ADMIN: 
        const {data}=action;
        return data?Object.assign({}, store,data):{};
    case ERROR:
        return action;
    default: return store;
  }
};

export default admin;