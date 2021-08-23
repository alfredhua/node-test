
let OSS = require('ali-oss');
const data=require('./config.dev.json');
var fs=require('fs');
const readline = require('readline');

let client = new OSS({
  region: data.region,
  accessKeyId: data.accessKeyId,
  accessKeySecret: data.accessKeySecret,
  bucket:data.bucketName
});


(async()=>{

  const fileStream = fs.createReadStream('./manual/manual.txt');
  const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
  });
  
  for await (const line of rl) {
    let l=line.split("|");
    if(l[1]!=''){
      var fileName=l[1].substring(l[1].lastIndexOf("\/")+1,l[1].length);
      //保存到oss上
      const result=await client.put("/manual/"+fileName,"./manual/"+fileName);
      var resultStr='';

      for(var index in l){
        if(index == 1){
          resultStr=resultStr+"|"+result.url;
        }else{
          resultStr = resultStr +"|" +l[index];
        }
      }
      console.log(`Line from file: ${resultStr}`);
      fs.appendFile('./test/manual.txt',resultStr+"\n",function(){

      });
    }
  }
 
})();