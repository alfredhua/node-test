const {workspaces}=require('../../package.json');
const child_process=require('child_process');
const path=require('path');

let all_promise=[]
for(let name of workspaces){
    if(name!='packages/*'&&name!="common"&&name!="start"){
      var promise = new Promise(function(resolve, reject) {
        let server_path=path.resolve(__dirname, '../../', name);
        let dist_path=path.resolve(__dirname, '../../', name+'/dist',);
        let out=child_process.execSync(`rm -rf  ${dist_path} && cd ${server_path} && npm run build`);
        console.log(out.toString('utf8'));
      });
       all_promise.push(promise)
    }
}
Promise.all(all_promise).then(function(values) {
    console.log("build finished ");
});