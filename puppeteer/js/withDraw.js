/**
 * 提现
 */
const puppeteer = require('puppeteer');
const delay=require('delay');
var app = require('./data');

(async () => {
  console.log("执行提现流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let withDraw = await page.$('#withDraw');
  if (withDraw) {
    await withDraw.click();
    await page.waitFor('#withDrawSub');
    console.log("到达提现页面");
    console.log("提现开始");
    let userId = await page.$('#userId');
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

    if (amount) {
      await amount.tap();
      const amountVal = await page.$eval('#amount', el => el.value);
      for (let i = 0; i < amountVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.amount);
    }

    console.log("提现参数处理完毕");
    let withDrawSub = await page.$('#withDrawSub');
    await withDrawSub.click();
    console.log("提现发送请求");
    await delay(1000);
    await page.waitFor('#encPin');
    await page.waitFor('#mainAcceptIpt');
    let encPin = await page.$('#encPin');
    if (encPin) {
      await encPin.tap();
      await page.type("111111");
    }
    let mainAcceptIpt = await page.$('#mainAcceptIpt');
    if(mainAcceptIpt){
      mainAcceptIpt.click();
    }
    //delay(5000);
    let sub = await page.$('#sub');
    await sub.click();

    await browser.close();
  }
})();
