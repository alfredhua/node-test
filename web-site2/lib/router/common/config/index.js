import path from 'path';
const cwd=process.cwd();
const config_path=path.resolve(cwd,'./');
if(!config_path){
  throw new Error('config path not found');
}
const dev = process.env.NODE_ENV==='dev';

var data={};

function load_config(path){
  if(dev){
    data=require(`${path}/config.dev.json`);
  }else{
    data=require(`${path}/config.pro.json`);
  }
}
load_config(config_path);

export default function config(key, error=false){
    if(error && !data.hasOwnProperty(key)){
        throw error===true? `缺少${key}`:error;
    }
    return data[key];
}
