'use strict';

const Tag = require('../../../../tag/tag');
const symbol = require('../symbol');

/**
 * append JS_HOOK to body
 * @example
 * {% body %}test{% endbody %}
 */
class BodyTag extends Tag {
  constructor() {
    super('body');
  }

  render(context, attrs, body) {
    const resource = context.ctx[symbol.RESOURCE];
    let tmp=body();
    if(tmp.indexOf(resource.JS_HOOK)<0){
      tmp=[tmp, resource.JS_HOOK].join('\n');
    }
    return super.render(context, attrs, tmp);
  }
}

module.exports = BodyTag;
