
const puppeteer = require('puppeteer-core');
const findChrome = require('carlo/lib/find_chrome.js');
var fs = require('fs');


(async()=>{
    let findChromePath = await findChrome({});
    let executablePath = findChromePath.executablePath;
    const browser = await puppeteer.launch({
      executablePath,
      headless: false
    });
    const page = await browser.newPage();
     
    await page.goto('https://cxy521.com/index.html', { waitUntil: 'networkidle2' });

    await page.waitFor('#hot-tool');
    var list=await page.$$("#hot-tool li",node => node );
    for(var i=0;i<list.length;i++){
         const src = await list[i].$eval('img', el => el.src);
         const href = await list[i].$eval('a', el => el.href);
         const title = await list[i].$eval('a', el => el.innerHTML);
         console.log(src,href,title);
         fs.appendFile('./tool/index.txt',"tool|"+src+"|"+href+"|"+title.trim() +"\n", function (error) {})
    }

    var arr=["top_tech","top_relax","top_study","top_devtool","top_work","top_media","top_resources","top_image","top_video","top_web"]
    for(var j=0;j<arr.length;j++){
        var list2=await page.$$("#"+arr[j]+" li",node => node );
        for(var i=0;i<list2.length;i++){
            const src = await list2[i].$eval('img', el => el.src);
            const href = await list2[i].$eval('a', el => el.href);
            const title = await list2[i].$eval('a', el => el.innerHTML);
            const description = await list2[i].$eval('p', el => el.innerHTML);
            console.log(src,href,title,description);
             fs.appendFile('./tool/index.txt',arr[j]+"|"+src+"|"+href+"|"+title.trim()+"|"+description.trim() +"\n", function (error) {})
        }
    }
    // fs.appendFile('./tool/index.txt',"-----------------------",function(error){})

    await page.goto('https://cxy521.com/manual.html', { waitUntil: 'networkidle2' });
    await page.waitFor('#hot');
    var teach=["hot","fe","java","python","be","tech"]
    for(var j=0;j<teach.length;j++){
        var list2=await page.$$("#"+teach[j]+" li",node => node );
        for(var i=0;i<list2.length;i++){
            const src = await list2[i].$eval('img', el => el.src);
            const href = await list2[i].$eval('a', el => el.href);
            const title = await list2[i].$eval('a', el => el.innerHTML);
            const description = await list2[i].$eval('p', el => el.innerHTML);
            console.log(src,href,title,description);
            fs.appendFile('./tool/manual.txt',arr[j]+"|"+src+"|"+href+"|"+title.trim()+"|"+description.trim() +"\n", function (error) {})
        }
    }

    await page.goto('https://cxy521.com/book.html', { waitUntil: 'networkidle2' });
    await page.waitFor('#base');
    var book=["base","java","python","fe","be","tech"]
    for(var j=0;j<book.length;j++){
        var list2=await page.$$("#"+teach[j]+" li",node => node );
        for(var i=0;i<list2.length;i++){
            const src = await list2[i].$eval('img', el => el.src);
            const href = await list2[i].$eval('a', el => el.href);
            const title = await list2[i].$eval('a', el => el.innerHTML);
            const description = await list2[i].$eval('p', el => el.innerHTML);
            console.log(src,href,title,description);
            fs.appendFile('./tool/book.txt',teach[j]+"|"+src+"|"+href+"|"+title.trim()+"|"+description.trim() +"\n", function (error) {})
        }
    }

})();