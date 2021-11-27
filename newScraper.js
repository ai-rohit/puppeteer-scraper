const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const dataDir = "./tmp/data/data.js";
(async()=>{
    const getAllData = async(url)=>{
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});
        
        const data = await page.evaluate(async()=>
            Array.from(document.querySelectorAll('div.result')).map(el=>{
                const detailUrl = el.querySelector('div.result-content-columns').getAttribute('onclick').split(',');
                return {
                    title: el.querySelector('div.result-title').innerText.trim(),
                    address: el.querySelector('div.address-text').innerText,
                    detailsUrl:"https://www.tripadvisor.com"+detailUrl[detailUrl.indexOf(' this')+1].replace(/'/g, '').replace(' ','')
                }
            })
        )
        await page.close();
        return data;
    }

    let i = 0;
    let o=0;
      let data=[];
    const browser = await puppeteer.launch();
    while(i<=33){
        const url = 'https://www.tripadvisor.com/Search?q=California&searchSessionId=95761B888D4DAB9E59B1DC315634EE581637557678911ssid&sid=49509F70215645C0B9331891E1CA2B471637557754948&blockRedirect=true&ssrc=e&geo=28926&rf='+i+"&o="+ o;
 
        console.log("scraping ",url);
        const allRestaurants = await getAllData(url);
        // console.log(allRestaurants);
        // console.log(allRestaurants.length);
        data =[...data,...allRestaurants]
        i=i+1;
        console.log(i);
        o=i*30;
    }
    await browser.close();
    console.log(data);
    console.log(data.length);
    // if(!fs.existsSync(dataDir)){
    //     fs.mkdirSync(dataDir,{recursive:true});
    // }
    // let file = fs.createWriteStream('array.txt');
    // file.on('error', function(err) { /* error handling */ });
    // data.forEach(function(v) { 
    //     console.log(v);
    //     file.write(v.join(', ') + '\n'); 
    // });
    // file.end();
    fs.appendFileSync(dataDir,"const data= [\n");
    data.forEach(element=>{
        fs.appendFileSync(dataDir,util.inspect(element)+',\n');  
    })
    fs.appendFileSync(dataDir,"];");
})();