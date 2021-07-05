/**
 * 放款
 */
const puppeteer = require('puppeteer');
const delay = require('delay');
var app = require('./data');

(async () => {
  console.log("执行还款冻结流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let repayLoanFrozen = await page.$('#repayLoanFrozen');
  if (repayLoanFrozen) {
    await repayLoanFrozen.click();
    await delay(1000);
    await page.waitFor('#repayLoanFrozenSub');
    console.log("到达还款冻结页面");
    console.log("还款冻结开始");
    let loanId = await page.$('#loanId');
    if (loanId) {
      await loanId.tap();
      const loanIdVal = await page.$eval('#loanId', el => el.value);
      for (let i = 0; i < loanIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanId);
    }
    console.log("还款冻结参数处理完毕");
    let repayLoanFrozenSub = await page.$('#repayLoanFrozenSub');
    await repayLoanFrozenSub.click();
    console.log("还款冻结发送请求");
    let result = await page.$('#result');
    await browser.close();
   
  }
})();
