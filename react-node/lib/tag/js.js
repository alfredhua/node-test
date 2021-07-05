'use strict';

const Tag = require('./tag');
/**
 * 自定义js tag
 */
class JsTag extends Tag {
   constructor() {
     super('js');
     this.end = false;
   }

   render(context, attrs) {
      let url = attrs[attrs.length - 1];
      let html = `<script type="text/javascript" src="/bzr/static/js/${url}.js"></script>`;
      return html;
   }
}

module.exports = JsTag;
