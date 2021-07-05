/**
 * 债权转让
 */
const puppeteer = require('puppeteer');
var app = require('./data');

(async () => {
  console.log("执行债权转让流程");
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(app.index, { waitUntil: 'networkidle' });
  let creditpay = await page.$('#creditpay');
  if (creditpay) {
    await creditpay.click();
    await page.waitFor('#creditPaySub');

    let payoutuserId = await page.$('#payoutuserId');
    let recoutuserId = await page.$('#recoutuserId');
    let amount = await page.$('#amount');
    let trprice = await page.$('#trprice');
    let fee = await page.$('#fee');
    let ancestralInvestId = await page.$('#ancestralInvestId');
    let creditId = await page.$('#creditId');
    let loanId = await page.$('#loanId');
    let endFlag = await page.$('#endFlag');
   
    if (payoutuserId) {
      await payoutuserId.tap();
      const payoutuserIdVal = await page.$eval('#payoutuserId', el => el.value);
      for (let i = 0; i < payoutuserIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.payoutuserId);
    }

    if (recoutuserId) {
      await recoutuserId.tap();
      const recoutuserIdVal = await page.$eval('#recoutuserId', el => el.value);
      for (let i = 0; i < recoutuserIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.recoutuserIdVal);
    }
    if (amount) {
      await amount.tap();
      const amountVal = await page.$eval('#amount', el => el.value);
      for (let i = 0; i < amountVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.toAmount);
    }

    if (trprice) {
      await trprice.tap();
      const trpriceVal = await page.$eval('#trprice', el => el.value);
      for (let i = 0; i < trpriceVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.trprice);
    }

    if (fee) {
      await fee.tap();
      const feeVal = await page.$eval('#fee', el => el.value);
      for (let i = 0; i < feeVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.creditFee);
    }

    if (ancestralInvestId) {
      await ancestralInvestId.tap();
      const ancestralInvestIdVal = await page.$eval('#ancestralInvestId', el => el.value);
      for (let i = 0; i < ancestralInvestIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.ancestralInvestId);
    }

    if (creditId) {
      await creditId.tap();
      const creditIdVal = await page.$eval('#creditId', el => el.value);
      for (let i = 0; i < creditIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.creditId);
    }

    if (loanId) {
      await loanId.tap();
      const loanIdVal = await page.$eval('#loanId', el => el.value);
      for (let i = 0; i < loanIdVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.loanId);
    }

    if (endFlag) {
      await endFlag.tap();
      const endFlagVal = await page.$eval('#loanId', el => el.value);
      for (let i = 0; i < endFlagVal.length; i++) {
        page.press('ArrowRight');
        page.press('Backspace');
      }
      await page.type(app.endFlag);
    }
    console.log("债权转让参数处理完毕");
    let createLoanSub = await page.$('#creditPaySub');
    await createLoanSub.click();
    console.log("债权转让发送请求");
    
  }
})();
