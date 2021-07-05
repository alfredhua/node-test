'use strict';

import Tag from './tag';
/**
 * author by wangshaojun
 * @example
 * css控件
 */
class CssTag extends Tag {
    constructor() {
        super('css');
        this.end = false;
    }

    render(context, attrs) {
        let url = attrs[attrs.length - 1];

        let path = process.env.platform;
        let html = '<link rel="stylesheet" href="/static/' + path + '/style/' + url + '.css">';

        return html;
    }
}

module.exports = CssTag;
