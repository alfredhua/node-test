
let OSS = require('ali-oss');
const data=require('./config.dev.json');
var fs=require('fs');
var request = require('request');
const readline = require('readline');
var rp = require('request-promise');

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

// const req =(url,path)=> new Promise((resolve, reject) =>{
//     request(url)
//     .pipe(
//       fs.createWriteStream(path).on('close',async function(){ })
//     );
// })

  for await (const line of rl) {
    let l=line.split("|");
    if(l[1]!=''){

      var fileName=l[1].substring(l[1].lastIndexOf("\/")+1,l[1].length);

      //下载文件到本地
      // let fileResponse = await request({url:l[1],encoding:'binary'}); 
      // await fs.writeFileSync('./test/'+fileName, fileResponse, 'binary');
      request(l[1]).pipe(fs.createWriteStream('./test/'+fileName))

      //保存到oss上
      const result=await client.put("/test/"+fileName,"./test/"+fileName);

      // console.log(request)
      // fs.appendFile('./test2.txt','',function(error){
      //     console.log("---------------")
      // });
         
     }
    console.log(`Line from file: ${line}`);
  }
 
})();