
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const findChrome = require('carlo/lib/find_chrome.js');
var fs = require('fs');


(async()=>{
    const domain=".chinahadoop.cn"
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    const browser = await puppeteer.launch({
      executablePath,
      headless: false
    });
    const page = await browser.newPage();
    await page.setCookie(
        {"name":"PHPSESSID","value":"","domain":"www.chinahadoop.cn"},
    ); 

    var arr=["2073"]

    for(var j=0;j<arr.length;j++){
      await page.goto("https://www.chinahadoop.cn/course/"+arr[j]+"/manage/lesson ", { waitUntil: 'networkidle2' });
      // period-list
      await page.waitFor('.link-dark');
      var title=await page.$eval(".link-dark ",node => node.innerHTML );
      fs.appendFile('./c.txt',title+"\n", function (error) {});
      await page.waitFor('.panel-body');

      const lession=arr[j];

      const lis=await page.$$eval(".item-lesson",(el,lession) => {
        var node=[];
        for(var i=0;i<el.length;i++){
          const id=el[i].id;
          const a=id.split("-");
          node.push({title:el[i].innerText,id:a[1]});
        }
        return node;
      });
      for(var i=0;i<lis.length;i++){
        fs.appendFile('./c.txt',lis[i].title+","+"https://www.chinahadoop.cn/course/"+lession+"/learn?preview=1#lesson/"+lis[i].id+"\n", function (error) {});
      }
    }
   



})();