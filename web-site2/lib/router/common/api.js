const axios = require("axios");
import config from './config';

export async function post_json(url, requestData) {
  try{

 
  const server=config('server');
  const result = await axios.post(server + url,
  requestData,
   {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  });
  return result.data;
 }catch(e){
   console.log(e);
 }
}

export async function post_string(url, requestData) {
  const { server } = config;
  let ret = server+ url +'?'+qs.stringify(requestData);
  const result = await axios.post(ret, {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  });
  return result.data;
}