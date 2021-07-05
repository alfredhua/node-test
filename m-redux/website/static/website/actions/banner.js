import {post} from 'common/static/util/request';

export const LIST_BANNER = "LIST_BANNER";
export const GET_BANNER = "GET_BANNER";
export const ERROR ="ERROR";

export const list_banner = (page,pageSize)=> async (dispatch) =>{
   const {code,msg,data} = await post("/website/list-banner",{page,pageSize});
   if(code === 'SUCCESS' ){
      dispatch({type: LIST_BANNER,data});
   }else{
      dispatch({type: ERROR,code,msg});
  }
}

export const get_banner = (id) => async (dispatch)=>{
   dispatch({type: GET_BANNER});
   const {code,msg,data} = await post("/website/get-banner",{id});
   if(code === 'SUCCESS' ){
      dispatch({type:GET_BANNER,data});
   }else{
      dispatch({type:ERROR,code,msg});
   }
}
