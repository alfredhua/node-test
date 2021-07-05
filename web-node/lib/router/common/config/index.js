import path from 'path';
import fs from 'fs';

const cwd=process.cwd();

function dir_exists(dir){
  try{
    fs.accessSync(dir, fs.constants.R_OK);
    return fs.statSync(dir).isDirectory();
  }catch(e){}
}
const [config_path]=['./', '../', '../../'].map(item=>path.resolve(cwd, `${item}`)).filter(dir_exists);
if(!config_path){
  throw new Error('config path not found');
}

var data={};
function load_config(path){
  data=require(`${path}/config.json`);
}
load_config(config_path);

export const dev = process.env.NODE_ENV==='dev';

export default function config(key, error=false){
    if(error && !data.hasOwnProperty(key)){
        throw error===true? `缺少${key}`:error;
    }
    return data[key];
}
