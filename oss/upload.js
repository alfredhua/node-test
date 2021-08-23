
let OSS = require('ali-oss');
const data=require('./config.dev.json');
var fs=require('fs');
var request = require('request');
const readline = require('readline');

let client = new OSS({
  region: data.region,
  accessKeyId: data.accessKeyId,
  accessKeySecret: data.accessKeySecret,
  bucket:data.bucketName
});


(async()=>{

  // const result=await client.put('a.png','./test/redhat-0b738f24ab.png');
  // console.log(JSON.stringify(result))

  const fileStream = fs.createReadStream('./file/test.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let l=line.split("|");
    if(l[1]!=''){
      var fileName=l[1].substring(l[1].lastIndexOf("\/")+1,l[1].length);
      const req =new Promise((resolve, reject) =>{
          request(l[1])
          .pipe(fs.createWriteStream("./test/"+fileName))
          .on('close',async function(){ });
      })
      const result=await client.put("/test/"+fileName,"./test/"+fileName);
      l[1]=result.url;
      console.log(l[1])
      fs.appendFile('./test2.txt',l.toString,function(error){
          console.log("---------------")
      });
         
     }
    console.log(`Line from file: ${line}`);
  }
 
})();