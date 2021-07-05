const axios = require("axios");
const qs = require("qs");

import config from '../config';
import {paramsSign} from './Sign';

export async function postJson(url, requestData) {
  const server=config('server');
  const sign=paramsSign('POST',server+url,requestData);
  requestData['sign']=sign;
  const result = await axios.post(server + url,
  requestData,
   {
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  });
  return result.data;
}

export async function postString(url, requestData) {
  const server=config('server');
  const sign=paramsSign('POST',server+url,{});
  let ret = server+ url +'?'+qs.stringify(requestData);
  const result = await axios.post(ret, {sign},{
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    }
  });
  return result.data;
}


