const { Base64 } = require('js-base64');
const { config } =require('../config');
var crypto = require('crypto');


 function paramsSign(method,url,requestData){
   requestData.app_key=config('app_key');
   var sortStr=method+url+objKeySort(requestData);
   const a=sortStr.substring(0,sortStr.length-1);
   console.log("签名数据",a);
   var sign=base64AndMd5(a);
   console.log("sign",sign);
   return  sign;
}

function objKeySort(obj) {
    let sigStr="?";
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        if(obj[newkey[i]]!=null){
            newObj[newkey[i]] = obj[newkey[i]];
            sigStr+=newkey[i]+"="+obj[newkey[i]]+"&"
        }
    }
    return sigStr;
}

function base64AndMd5(encryptString) {
      var md5 = crypto.createHash('md5');
      var dig=md5.update(encryptString).digest('hex');
      return Base64.encode(dig);
  }

  module.exports={ paramsSign }