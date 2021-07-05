/**
 * 放款
 */
const puppeteer = require('puppeteer');
const delay=require('delay');
var app = require('./data');

(async () => {
  console.log("执行放款流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let makeLoan = await page.$('#makeLoan');
  if (makeLoan) {
    await makeLoan.click();
    await page.waitFor('#makeLoan');
    console.log("到达放款页面");
    console.log("放款开始");
    await page.waitFor('#loanId');
    await page.waitFor('#outfeeamt');
    await page.waitFor('#infeeamt');
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
   
    await page.waitFor('#makeLoanSub');
    let makeLoanSub = await page.$('#makeLoanSub');
    makeLoanSub.click();
    await page.waitFor('#result');
    let result = await page.$('#result');
    console.log("放款发送请求");
    if(result){
      browser.close();
    }else{
      console.log("发生错误");
    }
  }
 
})();
