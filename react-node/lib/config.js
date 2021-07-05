import path from 'path';

export const dev = process.env.NODE_ENV === 'dev';
var data;
var dir = path.dirname(__dirname);
var filename = `config.${dev?'dev':'pro'}.json`;

while (true) {
  try {
      data = require(`${dir}/${filename}`);
      console.log(data);
  } catch (e) {
      console.log(e);
  }
  if (data) {
      break;
  }
  if (dir === '/') {
      throw `没有找到配置文件 ${filename}`;
  }
  dir = path.dirname(dir);
}

export  function config(server_name,error = false){
    if (error && !data.hasOwnProperty(server_name)) {
        throw error === true ? `缺少${server_name}` : error;
    }
    return data[server_name];
}