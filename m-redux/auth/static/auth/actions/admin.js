import {post} from 'common/static/util/request';

export const LIST_ADMIN ="LIST_ADMIN";
export const ERROR ="ERROR";

export const list_admin = (page,pageSize)=> async (dispatch) =>{
  const {code,msg,data} = await post("/auth/list-admin",{page,pageSize});
   if(code === 'SUCCESS' ){
      dispatch({type: LIST_ADMIN,data});
   }else{
      dispatch({type: ERROR,code,msg});
   }
}
