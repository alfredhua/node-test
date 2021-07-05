/**
 * 企业开户
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行企业开户流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let companyAccount = await page.$('#companyAccount');
  if (companyAccount) {
    await companyAccount.click();
    await page.waitFor('#companyAccount');
    await page.waitFor('#userId');
    await page.waitFor('#userName');
    await page.waitFor('#certNo');
    await page.waitFor('#mobile');
    await page.waitFor('#bankNo');
    await page.waitFor('#acctNo');
    await page.waitFor('#bankName');
    await page.waitFor('#areaCode');
    let userId = await page.$('#userId');
    let userName = await page.$('#userName');
    let certNo = await page.$('#certNo');
    let mobile = await page.$('#mobile');
    let bankNo = await page.$('#bankNo');
    let acctNo = await page.$('#acctNo');
    let bankName = await page.$('#bankName');
    let areaCode = await page.$('#areaCode');

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
    if (userName) {
      await userName.tap();
      const userNameVal = await page.$eval('#userName', el => el.value);
      for (let i = 0; i < userNameVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyUserName);
    }
    if (certNo) {
      await certNo.tap();
      const certNoVal = await page.$eval('#certNo', el => el.value);
      for (let i = 0; i < certNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyCertNo);
    }

    if (mobile) {
      await mobile.tap();
      const mobileVal = await page.$eval('#mobile', el => el.value);
      for (let i = 0; i < mobileVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyMobile);
    }
    if (bankNo) {
      await bankNo.tap();
      const bankNoVal = await page.$eval('#bankNo', el => el.value);
      for (let i = 0; i < bankNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyBankNo);
    }
    if (acctNo) {
      await acctNo.tap();
      const acctNoVal = await page.$eval('#acctNo', el => el.value);
      for (let i = 0; i < acctNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyAcctNo);
    }

    if (bankName) {
      await bankName.tap();
      const bankNameVal = await page.$eval('#bankName', el => el.value);
      for (let i = 0; i < bankNameVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyBankName);
    }

    if (areaCode) {
      await areaCode.tap();
      const areaCodeVal = await page.$eval('#areaCode', el => el.value);
      for (let i = 0; i < areaCodeVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.companyAreaCode);
    }
    console.log("参数处理完毕");
    await page.waitFor('#submitcompanyAccount');
    let search = await page.$('#submitcompanyAccount');
    await search.click();
    console.log("企业开户发送请求");
    await page.waitFor('#result');
    let result = await page.$('#result');
    if(result){
      browser.close();
    }else{
      console.log("发生错误");
    }
  }
})();