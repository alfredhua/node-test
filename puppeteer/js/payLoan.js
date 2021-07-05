/**
 * 投标
 */
const puppeteer = require('puppeteer');
const mysql = require('promise-mysql');
const SQL = require('sql-template-strings')
const moment = require('moment');
const delay=require('delay');
const app = require('./data');
const Promise = require("bluebird");
const getSqlConnection = require('./databaseConnection');

(async () => {
  var invest_id;
  const dateTime =  moment().format();
  Promise.using(getSqlConnection(), function(connection) {
      return connection.query(
        SQL`insert into invests(user_id,borrower_user_id,loan_id,loan_title,loan_amount,amount_paid,status,with_money,invest_done,create_time)
        VALUES  (${app.userId}, ${app.companyUserId}, ${app.loanId},${app.loanName},${app.loanAmount},${app.investAomut},'PAID','1','1',${dateTime})`).then(
          function(rows) {
            invest_id=rows.insertId;
            connection.query(SQL`insert into invest_receives(user_id,invest_id,loan_id,amount_principal,due_date,create_time)
                      VALUES  (${app.userId},${rows.insertId},${app.loanId},${app.loanAmount},${dateTime},${dateTime})`);
              return console.log(rows);
      }).catch(function(error) {
        console.log(error);
      });
  });

  console.log("执行投标流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let payLoan = await page.$('#payLoan');
  if (payLoan) {
    await payLoan.click();
    await page.waitFor('#payLoanSub');
    console.log("到达投标页面");
    console.log("投标开始");
    page.waitFor('#userId');
    let userId = await page.$('#userId');
    let investId = await page.$('#investId');
    let loanId = await page.$('#loanId');
    let amount = await page.$('#amount');
    
    if (userId) {
      await userId.tap();
      //获取userId的value值
      const userIdVal = await page.$eval('#userId', el => el.value);
      for (let i = 0; i < userIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.userId);
    }
    if (investId) {
      await investId.tap();
      const investIdVal = await page.$eval('#investId', el => el.value);
      for (let i = 0; i < investIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      console.log("bbbbb");
      console.log(invest_id);
      const invest_IdA = invest_id;
      await page.type(invest_IdA + "");
    }
    if (loanId) {
      await loanId.tap();
      const loanIdVal = await page.$eval('#loanId', el => el.value);
      for (let i = 0; i < loanIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanId);
    }

    if (amount) {
      await amount.tap();
      const amountVal = await page.$eval('#amount', el => el.value);
      for (let i = 0; i < amountVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.investAomut);
    }
    console.log("投标参数处理完毕");
    let recharge = await page.$('#payLoanSub');
    await recharge.click();
    console.log("投标发送请求");
    await delay(5000);
    await page.waitFor('#pass');
    await page.waitFor('#CARDNBR');
    await page.waitFor('#sub');
    await page.waitFor('#mainAcceptIpt');
    let pass = await page.$('#pass');
    if (pass) {
      await pass.tap();
      await page.type("111111");
    }
    let mainAcceptIpt = await page.$('#mainAcceptIpt');
    await mainAcceptIpt.click();
    let sub = await page.$('#sub');
    console.log("密码验证完毕");
    await sub.click();
    await delay(5000);
    console.log("投标成功");
    browser.close();
  }
})();
