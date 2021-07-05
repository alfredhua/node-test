/**
 * 代扣充值
 */
const puppeteer = require('puppeteer');
const app = require('./data');

(async () => {

  console.log("执行代扣充值流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let rechrage = await page.$('#rechrage');
  if (rechrage) {
    await rechrage.click();
    await page.waitFor('#rechargeHTML');
    console.log("到达充值页面");
    console.log("代扣充值开始");
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
    console.log("充值参数处理完毕");
    let recharge = await page.$('#deductRecharge');
    await recharge.click();
    console.log("充值发送请求");
    await page.waitFor('#result');
    browser.close();
  }
})();
