/**
 * 绑定银行卡
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {

  console.log("执行绑定银行卡流程");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let bindCard = await page.$('#bindCard');
  
  if (bindCard) {
    await bindCard.click();
    await page.waitFor('#bindCardSub');
    console.log("到达绑定银行卡页面");
    console.log("绑定银行卡开始");
    let userId = await page.$('#userId');
    let phone = await page.$('#phone');
    let cardNo=await page.$('#cardNo');
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

    if (cardNo) {
      await cardNo.tap();
      const cardNoVal = await page.$eval('#cardNo', el => el.value);
      for (let i = 0; i < cardNoVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.cardNo);
    }
    if(phone){
      await phone.tap();
      const phoneVal = await page.$eval('#phone', el => el.value);
      for (let i = 0; i < phoneVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.phone);
    }

    console.log("解绑银行卡参数处理完毕");
    let unBindCardSub = await page.$('#bindCardSub');
    await unBindCardSub.click();
    console.log("解绑银行卡发送请求");
    await page.waitFor('#result');
    let result = await page.$('#result');
    if(result){
      browser.close();
    }else{
      console.log("发生错误");
    }
  }
})();
