import axios from 'axios';
import {config} from './config';

var qs = require('qs');

async function post_string(server_name, url, data, token) {
    let referral = config('referral', true);
    data['referral']=referral;
    if (token && token != '' && token != null) {
        let ret = config(server_name, true) + url +'?'+qs.stringify(data);
        return await axios.post(ret, {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
                'token': token
            },
        });
    } else {
        let result = await axios.post(config(server_name, true) + url, qs.stringify(data));
        return result;
    }
}

async function post_json(server_name, url, data, token) {
    let referral = config('referral', true);
    if (token && token != '' && token != null) {
        let ret = config(server_name, true) + url + '?referral=' + referral+'&';
        return await axios.post(ret,data, {
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                    'token': token
                },
              });
    } else {
        let result = await axios.post(config(server_name, true) + url, qs.stringify(data));
        return result;
    }

}