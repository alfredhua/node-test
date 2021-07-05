import {post} from 'common/static/util/request';
export const GET_ROLE ="GET_ROLE";
export const LIST_ROLE="LIST_ROLE";
export const ERROR ="ERROR";
export const SUCCESS ="SUCCESS";
export const CHANGE="CHANGE";
export const CLOSE ="CLOSE";

// 角色列表
export const list_role = (page_num,page_size)=> async (dispatch) =>{
   const {code,msg,data} =await post("/auth/list-role",{ page_num,page_size});
    if(code === 'SUCCESS' ){
       dispatch({type: LIST_ROLE,data});
    }else{
       dispatch({type: ERROR,code,msg});
    }
 }

 
//角色编辑
export const get_role_by_id = (id)=> async (dispatch) =>{
   let info;
   if(id){
    const {code,data} = await post("/auth//get-role-by-id",{id});
    if(code==='SUCCESS'){
      info=data;
      info.auth_list=JSON.parse(info.auth_list);
    }
   }
  const {code,msg,data} = await post("/auth/authority-list",{});
   if(code === 'SUCCESS' ){
      dispatch({type: GET_ROLE,data:{authority_list:data,info}});
   }else{
      dispatch({type: ERROR,code,msg});
   }
}

export const save_role = (id,name,comment,auth_list)=>async(dispatch)=>{
   let result;
   if(id){
      result=await post("/auth/update-role",{id,name,comment,auth_list});
   }else{
      result=await post("/auth/create-role",{name,comment,auth_list});
   }
   if(result.code === 'SUCCESS' ){
      dispatch({type: SUCCESS,data:{...result}});
   }else{
      dispatch({type: ERROR,data:{...result}});
   }
}

export const change=(item,value)=>async(dispatch)=>{
   dispatch({type:CHANGE,item,value});
};

export const close=()=>async(dispatch)=>{
   dispatch({type:CLOSE});
}
