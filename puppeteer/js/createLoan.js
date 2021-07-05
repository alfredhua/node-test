/**
 * 开标
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行开标流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let createLoan = await page.$('#createLoan');
  if (createLoan) {
    await createLoan.click();
    await page.waitFor('#createLoanHTML');
    let userId = await page.$('#userId');
    let loanId = await page.$('#loanId');
    let loanName = await page.$('#loanName');
    let amount = await page.$('#amount');
    let loanTerm = await page.$('#loanTerm');
    let rate = await page.$('#rate');
    if (userId) {
      await userId.tap();
      //获取userId的value值
      const userIdVal = await page.$eval('#userId', el => el.value);
      for (let i = 0; i < userIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanUserId);
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
    if (loanName) {
      await loanName.tap();
      const loanNameVal = await page.$eval('#loanName', el => el.value);
      for (let i = 0; i < loanNameVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanName);
    }
    if (amount) {
      await amount.tap();
      const amountVal = await page.$eval('#amount', el => el.value);
      for (let i = 0; i < amountVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanAmount);
    }
    if (loanTerm) {
      await loanTerm.tap();
      const loanTermVal = await page.$eval('#loanTerm', el => el.value);
      for (let i = 0; i < loanTermVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanTerm);
    }
    if (rate) {
      await rate.tap();
      const rateVal = await page.$eval('#rate', el => el.value);
      for (let i = 0; i < rateVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanRate);
    }
    console.log("开标参数处理完毕");
    let createLoanSub = await page.$('#createLoanSub');
    await createLoanSub.click();
    console.log("开标发送请求");
    await page.waitFor('#result');
  }
  browser.close();
})();
