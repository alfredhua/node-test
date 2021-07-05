import { ADD,DEL } from '../actions/admin';

//做数据处理的
const  admin = (count = 0, action) => {
  switch (action.type) {
    case ADD: return ++count;
    case DEL: return --count;
    default: return count;
  }
};

export default admin;
  
