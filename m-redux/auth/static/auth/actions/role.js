import {post} from 'common/static/util/request';

export const LIST_AUTHORITY ="LIST_AUTHORITY";
export const ERROR ="ERROR";
export const SUCCESS ="SUCCESS";
export const CLOSE ="CLOSE";


export const list_authority = ()=> async (dispatch) =>{
  const {code,msg,data} = await post("/auth/authority-list",{});
   if(code === 'SUCCESS' ){
      dispatch({type: LIST_AUTHORITY,data});
   }else{
      dispatch({type: ERROR,code,msg});
   }
}

export const save_role = (id,name,comment,authList)=>async(dispatch)=>{
   let result;
   if(id){
      result=await post("/auth/update-role",{id,name,comment,authList});
   }else{
      result=await post("/auth/create-role",{name,comment,authList});
   }
   dispatch({type:result.code,data:{...result}});
}

export const close=()=>async(dispatch)=>{
   dispatch({type:CLOSE});
}


