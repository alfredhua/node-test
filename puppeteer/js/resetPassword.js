/**
 * 重置密码
 */
const puppeteer = require('puppeteer');
const delay=require('delay')
var app = require('./data');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  await page.waitFor('#resetPassword');
  
  let rechrage = await page.$('#resetPassword');
  if (rechrage) {
    await rechrage.click();
    await page.waitFor('#userId');
    let userId = await page.$('#userId');
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
    let recharge = await page.$('#resetPasswordSubmit');
    await recharge.click();
    console.log("修改密码发送请求");
    await page.waitFor('#encPin1');
    await page.waitFor('#encPin2');
    let encPin1 = await page.$('#encPin1');
    let encPin2 = await page.$('#encPin2');
    if (encPin1) {
      await encPin1.tap();
      await page.type("111111");
    }
    if (encPin2) {
      await encPin2.tap();
      await page.type("111111");
    }
    await page.waitFor('#mainAcceptIpt');
    let mainAcceptIpt = await page.$('#mainAcceptIpt');
    await mainAcceptIpt.click();
    let sub = await page.$('#sub');
    await sub.click();
    await browser.close();
  }
})();
