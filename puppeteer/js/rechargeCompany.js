/**
 * 企业充值
 */
const puppeteer = require('puppeteer');
const delay=require('delay');
var app = require('./data');

(async () => {
  console.log("执行企业充值流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let rechrage = await page.$('#rechrage');
  if (rechrage) {
    await rechrage.click();
    await page.waitFor('#rechargeHTML');
    console.log("到达企业充值页面");
    console.log("企业充值开始");
    let userId = await page.$('#companyUserId');
    let amount = await page.$('#companyAomunt');
    if (userId) {
      await userId.tap();
      //获取userId的value值
      const userIdVal = await page.$eval('#userId', el => el.value);
      for (let i = 0; i < userIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyUserId);
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

    console.log("企业充值参数处理完毕");
    await page.waitFor('#companyRechargeSub');
    let rechargeNormal = await page.$('#companyRechargeSub');
    await rechargeNormal.click();
    console.log("企业充值发送请求");
    await page.waitFor('#B2B_ICBC');
    const icbcClick = await page.$("#B2B_ICBC");
    await icbcClick.click();
    await page.waitFor('#submitButton');
    const submit = await page.$("#submitButton");
    await submit.click();
  //  await delay(5000);
    await page.waitFor('a');
    const a = await page.$('a');
    await a.click();
    await page.waitFor('#bank_message');
    const bank_message = await page.$("#bank_message");
    await browser.close();
  }
})();
