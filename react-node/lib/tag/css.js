'use strict';

const Tag = require('./tag');
/**
 * 自定义js tag
 */
class CssTag extends Tag {
   constructor() {
     super('css');
     this.end = false;
   }

   render(context, attrs) {
       let name = attrs[attrs.length - 1];
       let html = '<link rel="stylesheet" href="/bzr/static/style/css/'+ name +'.css">';

     return html;
   }
}

module.exports = CssTag;
