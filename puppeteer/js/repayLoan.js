/**
 * 还款
 */
const puppeteer = require('puppeteer');
const delay=require('delay');
var app = require('./data');

(async () => {
  console.log("执行还款流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let repayLoan = await page.$('#repayLoan');
  if (repayLoan) {
    await repayLoan.click();
    await page.waitFor('#repayLoanSub');
    console.log("到达还款页面");
    console.log("还款开始");
    let loanId = await page.$('#loanId');
    let outfeeamt = await page.$('#outfeeamt');
    let infeeamt = await page.$('#infeeamt');
    if (loanId) {
      await loanId.tap();
      const loanIdVal = await page.$eval('#loanId', el => el.value);
      for (let i = 0; i < loanIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanId);
    }
    if (infeeamt) {
      await infeeamt.tap();
      const infeeamtVal = await page.$eval('#infeeamt', el => el.value);
      for (let i = 0; i < infeeamtVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.infeeamt);
    }

    if (outfeeamt) {
      await outfeeamt.tap();
      const outfeeamtVal = await page.$eval('#outfeeamt', el => el.value);
      for (let i = 0; i < outfeeamtVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.outfeeamt);
    }
    console.log("还款参数处理完毕");
    await page.waitFor('#repayLoanSub');
    let repayLoanSub = await page.$('#repayLoanSub');
    await delay(5000);
    await repayLoanSub.click();
    console.log("还款发送请求");
    await page.waitFor('#result');
    await browser.close();
  }
})();
