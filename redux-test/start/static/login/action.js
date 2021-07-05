import {post} from 'common/static/util/request';

export const LOGIN ="LOGIN";
export const VERIFY ="VERIFY";
export const ERROR="ERROR";
export const CHANGE="CHANGE";

export const load_captcha = () =>async (dispatch) =>{
  const {svg,key} = await post("/common/captcha",{});
  dispatch({type: VERIFY,data:{svg,key}});
}

export const login_user = (user_name,password,verify,key)=> async (dispatch) =>{
  const {code,msg,data} = await post("/login",{user_name,password,verify,key});
   if(code === 'SUCCESS' ){
      const {token,auth_list}=data;
      window.localStorage.setItem(token,auth_list)
      dispatch({type: LOGIN,data:{...data,code}});
   }else{
      dispatch({type: ERROR,data:{msg}});
   }
}

export const change=(item,value)=>async(dispatch)=>{
   dispatch({type:CHANGE,item,value});
};