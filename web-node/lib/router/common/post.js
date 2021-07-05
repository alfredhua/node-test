import axios from "axios";
import qs from 'qs';
import config from './config';

export  async function post(url, data){
  let result;
  console.log(config("server",true),""+url);
  if(data){
    result= await axios.post(config("server",true)+url, qs.stringify(data));
  }else{
    result= await axios.post(config("server",true)+url);
  }
  return result.data;
}

