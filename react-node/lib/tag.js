// add by wangshaojun
// tag 列表
const TagNames = ['css', 'js', 'page'];

module.exports = function(env, path){
    const CustomTags = TagNames.map((tagName) => {
       let Tag = require('./tag/' + tagName);
       return new Tag(path);
    });
    CustomTags.forEach((tag) => {
      env.addExtension(tag.tagName, tag);
    });

}
