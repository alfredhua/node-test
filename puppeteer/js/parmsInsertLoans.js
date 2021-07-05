/**
 * 放款之前插入模拟数据
 */

const SQL = require('sql-template-strings')
var Promise = require("bluebird");
var getSqlConnection = require('./databaseConnection');
var app = require('./data');
var moment = require('moment');
(async () => {
    var date =  moment().format();
    Promise.using(getSqlConnection(), function(connection) {
        return connection.query(
        SQL`insert into loans(id,loanproposal_id,borrower_user_id,title,status,disabled,date_of_value,date_of_maturity)
        VALUES  (${app.loanId}, ${app.companyUserId}, ${app.companyUserId},${app.loanName},'REPAY','0',${date},${date})`).then(function(rows) {
          return console.log(rows);
        }).catch(function(error) {
          console.log(error);
        });
    });
})();



