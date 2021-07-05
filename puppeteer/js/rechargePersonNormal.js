/**
 * 正常充值
 */
const puppeteer = require('puppeteer');
const delay=require('delay');
var app = require('./data');

(async () => {
  console.log("执行正常充值流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let rechrage = await page.$('#rechrage');
  if (rechrage) {
    await rechrage.click();
    await page.waitFor('#rechargeHTML');
    console.log("到达正常充值页面");
    console.log("正常充值开始");
    let userId = await page.$('#norUserId');
    let amount = await page.$('#norAomunt');
    let fee = await page.$('#norFee');
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
    if (fee) {
      await fee.tap();
      const feeVal = await page.$eval('#norFee', el => el.value);
      for (let i = 0; i < feeVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.fee);
    }
      console.log("充值参数处理完毕");
      let rechargeNormal = await page.$('#rechargeNormal');
      await rechargeNormal.click();
      console.log("正常充值发送请求");
      await page.waitFor('#card_view_more');
      await page.waitFor("input[value='ICBC']");
      const icbcClick =await page.$("input[value='ICBC']");
    if(icbcClick){
      await icbcClick.click();
      await page.waitFor('.btnw220');
    const submit = await page.$(".btnw220");    
      if(submit){
        await submit.click();
      }
    }
      await page.waitFor('a');
      let a = await page.$('a');
      await a.click();
      console.log("充值成功");
      await page.waitFor('#bank_message');
      const bank_message = await page.$("#bank_message");
      await browser.close();
  }
})();
