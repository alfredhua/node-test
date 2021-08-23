
let OSS = require('ali-oss');
const data=require('./config.dev.json');
var fs=require('fs');
var request = require('request');

let client = new OSS({
  region: data.region,
  accessKeyId: data.accessKeyId,
  accessKeySecret: data.accessKeySecret
});


(async()=>{
    request("https://shop-1256119282.file.myqcloud.com/tooools/static/img/index/tool/timestamp-bf543ed911.png")
        .pipe(fs.createWriteStream("./a.png")).on('close',function(){
        console.log('pic saved!')
   });
    let result = await client.put('exampleobject.txt', 'D:\\localpath\\examplefile.txt');
})();