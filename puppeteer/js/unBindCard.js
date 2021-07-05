/**
 * 解绑银行卡
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行解绑银行卡流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let bindCard = await page.$('#bindCard');
  if (bindCard) {
    await bindCard.click();
    await page.waitFor('#unBindCardSub');
    console.log("到达解绑银行卡页面");
    console.log("解绑银行卡开始");
    let unUserId = await page.$('#unUserId');
    let unCardNo = await page.$('#unCardNo');
    if (unUserId) {
      await unUserId.tap();
      //获取userId的value值
      const unUserIdVal = await page.$eval('#unUserId', el => el.value);
      for (let i = 0; i < unUserIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.userId);
    }

    if (unCardNo) {
      await unCardNo.tap();
      const unCardNoVal = await page.$eval('#unCardNo', el => el.value);
      for (let i = 0; i < unCardNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.cardNo);
    }

    console.log("解绑银行卡参数处理完毕");
    let unBindCardSub = await page.$('#unBindCardSub');
    await unBindCardSub.click();
    console.log("解绑银行卡发送请求");
    await page.waitFor('#result');
  }
  browser.close();
})();
