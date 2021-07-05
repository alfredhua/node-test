import { post } from '../request';
export async function isok(path){
  try {
    return await versifyAuth(path)
  } catch (e) {
    console.log(e);
  }
  return false;
};

function versifyAuth(path){
  return post('/versify-auth',{auth:path}).then((result)=>{
    const {code}=result;
    if(code === 'SUCCESS' ){
      return true;
    }else{
      return false;
    }
  });
}
