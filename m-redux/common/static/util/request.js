import axios from 'axios';


export  async function post(url, data){
    const result=await axios.post(url, data);
    return result.data;
}

export async function get(url){
  const result=await axios.get(url);
  return result.data;
}
