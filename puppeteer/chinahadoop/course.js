
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const findChrome = require('carlo/lib/find_chrome.js');
var fs = require('fs');


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
        {"name":"PHPSESSID","value":"","domain":"www.chinahadoop.cn"},
    ); 

    var arr=["https://www.chinahadoop.cn/course/1505",
    "https://www.chinahadoop.cn/course/1561",
    "https://www.chinahadoop.cn/course/1604",
    "https://www.chinahadoop.cn/course/1636",
    "https://www.chinahadoop.cn/course/1745",
    "https://www.chinahadoop.cn/course/1795",
    "https://www.chinahadoop.cn/course/1808",
    "https://www.chinahadoop.cn/course/1850"]

    for(var j=0;j<arr.length;j++){
      await page.goto(arr[j], { waitUntil: 'networkidle2' });
      // period-list
      await page.waitFor('.course-info');
      var course_info=await page.$(".course-info ",node => node );
      const title =await course_info.$eval(".title",el=>el.innerHTML);

      fs.appendFile('./b.txt',title+"\n", function (error) {});

      await page.waitFor('.period-list');
      var lis=await page.$$(".period-list li",node => node );
      for(var i=0;i<lis.length;i++){
      //    const hrefa= await lis[i].$(".course-lesson",e => e);
         const preloadHref = await lis[i].$eval('.course-lesson', el => el.href);
         const title = await lis[i].$eval('.title', el => el.innerHTML);
         fs.appendFile('./b.txt',title+","+preloadHref +"\n", function (error) {
        })
      }
      console.log
    }
   



})();