/**
 * 放款文件检查
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("放款文件检查流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let makeLoanCheck = await page.$('#makeLoanCheck');
  if (makeLoanCheck) {
    await makeLoanCheck.click();
    await page.waitFor('#makeLoanCheck');
    console.log("到达放款检查文件页面");
    console.log("检查文件开始");
    await page.waitFor('#loanId');
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
    console.log("放款文件检查参数处理完毕");
    let checkLoanSub = await page.$('#checkLoanSub');
    await checkLoanSub.click();
    console.log("放款文件检查发送请求");
    await page.waitFor('#result');
    browser.close();
  }
})();
