/**
 * 还款文件检查
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行还款文件检查流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let repayLoanCheck = await page.$('#repayLoanCheck');
  if (repayLoanCheck) {
    await repayLoanCheck.click();
    await page.waitFor('#repayLoanCheckSub');
    console.log("到达还款文件检查页面");
    console.log("还款文件检查开始");
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
    console.log("还款文件检查参数处理完毕");
    let repayLoanCheckSub = await page.$('#repayLoanCheckSub');
    await repayLoanCheckSub.click();
    console.log("还款文件检查发送请求");
    await browser.close();
  }
})();
