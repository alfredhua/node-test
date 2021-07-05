const fs = require('fs-extra');
const path=require('path');

function norm_path(any_path){
  return path.resolve(path.dirname(__dirname), any_path);
}
function nm(path){
  return require.resolve(path);
}

function copy(...list){
  Promise.all(list.map(({src, dest, options})=>fs.copy(norm_path(src), norm_path(dest), {overwrite:true, ...options}) )).catch(err=>console.error(err));
}

copy(
  {src:'bzr/static/style', dest:'dist/static/style'},
  {src:'bzr/static/js', dest:'dist/static/js'},
  {src:'bzr/static/images', dest:'dist/static/images'},
  {src:'views/', dest:'dist/views'}
)