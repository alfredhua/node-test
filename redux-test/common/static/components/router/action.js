import {post} from 'common/static/util/request';

export const ERROR ="ERROR";
export const SUCCESS="SUCCESS";

export const load_data = ()=> async (dispatch) =>{
    const {code,msg,data} = await post("/get-auth",{});
    if(code === 'SUCCESS' ){
      dispatch({type: SUCCESS,data});
   }else{
      dispatch({type: ERROR,code,msg});
   }
}