
const puppeteer = require('puppeteer');

const 
url="http://m.railcapital.com.cn/offlineloan/confirm?id=31c7268656b749139fb9252427aeae50",
domain=".railcapital.com.cn",
rsessionid="5771aec18fbf4be9b84f370489ab582c",
rsessionid_sig="oWd52lO60Yzuu0Zco2ZhywmZ5yY",
amount="100000";

(async()=>{
    console.log("------开始抢标-----")
    for(var i=1;i<10000;i++){
        const browser = await puppeteer.launch({headless:false,devtools:true});
        const page = await browser.newPage();
        await page.setCookie(
            {"name":"rsessionid","value":rsessionid,"domain":domain},
            {"name":"rsessionid.sig","value":rsessionid_sig,"domain":domain}
        ); 
        await page.goto(url);
        let submit_confirm= await page.$('#submit_confirm')
        if (submit_confirm) {
            const wait = await page.$eval('.zr-pub-button', el => el.innerText);
            if(wait==='份额确认中'){
                console.log("---------标的没有释放,第"+i+"轮--------");
                browser.close();
                continue;
            }
            const avail_amount = await page.$eval('.big-number', el => el.innerText);
            if(avail_amount==0||avail_amount<parseFloat(amount)){
                console.log("---------剩余金额不足--------")
                browser.close();
                break;
            }
            await page.type('#offlineloanAmount', amount);
            let submit_confirm = await page.$('#submit_confirm');
            await submit_confirm.click();
            console.log("---------抢标成功--------");
            browser.close();
            break;
        }else{
            console.log("---------标的没有释放,第"+i+"轮--------");
            browser.close();
        }
    }

})();