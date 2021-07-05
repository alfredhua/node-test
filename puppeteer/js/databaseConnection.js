/**
 * 连接数据库
 */

var mysql = require('promise-mysql');
    pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'demo',
    password: 'demo',
    database: 'rui_site',
    connectionLimit: 10
    });
    function getSqlConnection() {
        return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
        pool.end();
    });
    }

module.exports = getSqlConnection;