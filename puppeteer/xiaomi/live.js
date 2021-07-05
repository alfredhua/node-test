/**
 * 小米刷直播
 */
const puppeteer = require('puppeteer');
(async () => {
  var conetext=['双击666666,美极了,666666','帅呆了，酷毙了,美极了,666666','棒极了,美极了,666666','配置超级好,美极了,666666','美极了,666666','完爆其它机型,美极了,666666','666666666','good,good,美极了,666666','ssssssssssss,美极了,666666','美美美,美极了,666666'];
  console.log("小米直播开刷");
  for(var i=0;i<10;i++){
    console.log("第"+i+"次");
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto("http://www.mi.com/a/h/8497.html?client_id=180100041086", { waitUntil: 'networkidle2' });
    var  a=Math.floor(Math.random()*10);
    await page.type('#J_chatContent', conetext[a]);
    let J_sendChatBtn = await page.$('#J_sendChatBtn');
    await J_sendChatBtn.click();

    await page.waitFor('#username');
    await page.waitFor('#pwd');
    await page.type('#username', '');
    await page.type('#pwd', '');
    let login_button = await page.$('#login-button');
    await login_button.click();

    await page.waitFor('#J_sendChatBtn');
    var  a=Math.floor(Math.random()*10);
    await page.type('#J_chatContent', conetext[a]);
    let J_sendChatBtn1 = await page.$('#J_sendChatBtn');
    await J_sendChatBtn1.click();

  }
})();
