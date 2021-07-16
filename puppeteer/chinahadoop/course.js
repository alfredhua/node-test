
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const findChrome = require('carlo/lib/find_chrome.js');


(async()=>{
    const domain=".chinahadoop.cn"
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    console.log(executablePath)
    const browser = await puppeteer.launch({
      executablePath,
      headless: false
    });
    const page = await browser.newPage();
    await page.setCookie(
        // {"name":"zg_727f75a76e954bc385156eb7ff3fb110","value":"%7B%22sid%22%3A%201626444760866%2C%22updated%22%3A%201626445605783%2C%22info%22%3A%201626444760871%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22%22%2C%22landHref%22%3A%20%22http%3A%2F%2Fchinahadoop.cn%2F%22%2C%22cuid%22%3A%20%22122231654%22%7D","domain":domain},
        // {"name":"zg_did","value":"%7B%22did%22%3A%20%2217aafa9871c959-06d0d1d5e04bc2-11114659-240000-17aafa9871d113%22%7D","domain":domain},
        // {"name":"Hm_lvt_76f43f8e8ae8a2808eff38c3d33338b2","value":"1626444761,1626444802,1626448230","domain":domain},
        // {"name":"Hm_lpvt_76f43f8e8ae8a2808eff38c3d33338b2","value":"1626448329","domain":domain},
        {"name":"PHPSESSID","value":"b13a8d3054a541b016d7d0a0477e6118","domain":"www.chinahadoop.cn"},
    ); 

    await page.goto("https://www.chinahadoop.cn/course/1850", { waitUntil: 'networkidle2' });

    // period-list
    await page.waitFor('.period-list');

    var lis=await page.$$(".period-list li",node => node );
    for(var i=0;i<lis.length;i++){
    //    const hrefa= await lis[i].$(".course-lesson",e => e);
       const preloadHref = await lis[i].$eval('.course-lesson', el => el.href);
       const title = await lis[i].$eval('.title', el => el.innerHTML);
       console.log(title,preloadHref);
    }



})();