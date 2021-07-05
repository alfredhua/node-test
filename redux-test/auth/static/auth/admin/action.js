import {post} from 'common/static/util/request';

export const LIST_ADMIN ="LIST_ADMIN";
export const EDIT_ADMIN="EDIT_ADMIN";
export const ERROR ="ERROR";
export const SUCCESS="SUCCESS";
export const CLOSE="CLOSE";

export const list_admin = (pageNum,pageSize)=> async (dispatch) =>{
  const {code,msg,data} = await post("/auth/list-admin",{pageNum,pageSize});
   if(code === 'SUCCESS' ){
      dispatch({type: LIST_ADMIN,data});
   }else{
      dispatch({type: ERROR,code,msg});
   }
}

export const save_admin = (admin) => async (dispatch) =>{
   let result=null;
   admin.role_id_list=JSON.stringify(admin.role_id_list);
   admin.status=admin.status?parseInt(admin.status):0;
   if(admin.id){
      result=await post("/auth/update-admin",{...admin});
   }else{
      result= await post("/auth/create-admin",{...admin});
   }
   if(result==null){
      dispatch({type:ERROR,data:{admin}});
      return;
   }
   if(result.code === 'SUCCESS' ){
       dispatch({type:SUCCESS,data:{...result}});
   }else{
      admin.role_id_list=JSON.parse(admin.role_id_list);
      dispatch({type: ERROR,data:{...result,admin}});
   }
 }

export const get_admin_by_id=(id)=>async (dispatch) =>{
   let data={};
   if(id){
      let admin_result = await post("/auth/get-admin-by-id",{id});
      admin_result.data.role_id_list=JSON.parse(admin_result.data.role_id_list);
      data.admin=admin_result.data;
   }
   const role_list_result = await post("/auth/list-all-use-role",{});
   if(role_list_result.code === 'SUCCESS' ){
      data.role_list=role_list_result.data;
      dispatch({type: EDIT_ADMIN,data});
   }else{
      dispatch({type: ERROR,code:role_list_result.code,msg:role_list_result.msg});
   }
}

export const close=()=>async(dispatch)=>{
   dispatch({type:CLOSE});
}
