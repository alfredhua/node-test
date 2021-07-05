var util = require('util');

const fs = require("fs");
const path = require('path');


var dir = 'static/';
var platform = process.env.platform;

dir += platform == 'h5' ? 'h5' : 'pc';



var dir_arry = [];
fs.readdirSync(`./${dir}/images/icons`).forEach((item) => {
    fs.statSync(path.join(__dirname, `./${dir}/images/icons/${item}`)).isDirectory() && dir_arry.push(item);
});
var option = {};
var option_arr = [];
for (var i = 0;i < dir_arry.length;i++) {
    option = {
      cssTemplate:'handlebars.css.handlebars'
    };
    var name = dir_arry[i];
    option.src = `./${dir}/images/icons/${dir_arry[i]}/**/*.{png,gif,jpg}`;
    option.destImage = `./dist/${dir}/images/icons/${dir_arry[i]}.png`;
    option.destCSS = `./dist/${dir}/style/icons/${dir_arry[i]}.css`;
    option.imgPath = `/${dir}/images/icons/${dir_arry[i]}.png`;
    option_arr.push(option);
}

module.exports = option_arr;
