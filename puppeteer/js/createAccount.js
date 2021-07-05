/**
 * 个人开户
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行开户流程");
  const browser = await puppeteer.launch({headless:false,slowMo: 250});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let account = await page.$('#account');
  if (account) {
    await account.click();
    await page.waitFor('#accountPer');
    console.log("到达开户页面");
    let userId = await page.$('#userId');
    let phone = await page.$('#phone');
    let idCardName = await page.$('#idCardName');
    let idCardNumber = await page.$('#idCardNumber');
    let preBankMobile = await page.$('#preBankMobile');
    let cardNo = await page.$('#cardNo');
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
    if (phone) {
      await phone.tap();
      const phoneVal = await page.$eval('#phone', el => el.value);
      for (let i = 0; i < phoneVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.phone);
    }
    if (idCardName) {
      await idCardName.tap();
      const idCardNameVal = await page.$eval('#idCardName', el => el.value);
      for (let i = 0; i < idCardNameVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.idCardName);
    }
    if (idCardNumber) {
      await idCardNumber.tap();
      const idCardNumberVal = await page.$eval('#idCardNumber', el => el.value);
      for (let i = 0; i < idCardNumberVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.idCardNumber);
    }
    if (preBankMobile) {
      await preBankMobile.tap();
      const preBankMobileVal = await page.$eval('#preBankMobile', el => el.value);
      for (let i = 0; i < preBankMobileVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.preBankMobile);
    }
    if (cardNo) {
      await cardNo.tap();
      const cardNoVal = await page.$eval('#cardNo', el => el.value);
      for (let i = 0; i < cardNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.cardNo);
    }

    console.log("参数处理完毕");
    let search = await page.$('#submitAccount');
    await search.click();
    console.log("开户发送请求");
    await page.waitFor('#result');
    let result = await page.$('#result');
    if(result){
      await browser.close();
    }else{
      console.log("发生错误");
    }
   
  }
})();
