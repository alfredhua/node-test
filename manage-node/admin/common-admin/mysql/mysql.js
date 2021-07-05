import config from '../config';

const mysql = require('promise-mysql');

const cfg= Object.assign({
  connectionLimit: 10,
  typeCast:function(field, next){
    if (field.type == "TINY" && field.length == 1) {
      var bit = field.string();
      return bit=='1';
    }
    return next();
  }
}, config('db', true));

const pool = mysql.createPool(cfg);

export default pool;

