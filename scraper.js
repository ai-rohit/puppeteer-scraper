const puppeteer = require('puppeteer');
const url = require('url');
const { getData } = require('./reviewscraper');
const {performance} = require('perf_hooks');

(async()=>{
    let startTime = performance.now();
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url = "https://www.tripadvisor.com/Search?q=California&searchSessionId=95761B888D4DAB9E59B1DC315634EE581637557678911ssid&sid=49509F70215645C0B9331891E1CA2B471637557754948&blockRedirect=true&ssrc=e&geo=28926&rf=4";
        
        await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});
        // await page.screenshot({path: 'google-partners.png'});
    
        // const textContent = await page.evaluate(()=>{
        //     return document.querySelectorAll('h3.title');
        // });
        const webdata = await page.evaluate(async ()=>{
            
            // const data = [];

            // const result = Array.from(document.querySelectorAll('div.result'));

            // for(let i = 0; i < result.length; i++){
            //     const title = result[i].querySelector('div.result-title').innerText.trim();
            //     const address = result[i].querySelector('div.address-text').innerText;
            //     const detailEndpoint = result[i].querySelector('div.result-content-columns').getAttribute('onclick').split(',')[result[i].querySelector('div.result-content-columns').getAttribute('onclick').split(',').indexOf(' this')+1].replace(/'/g, '').replace(' ','');
            //     const newUrl = "https://www.tripadvisor.com"+ detailEndpoint;
                
            //     // await page.goto(newUrl, {waitUntil: 'networkidle0', timeout:0});
            //     // const details = await page.evaluate(()=>{
            //     //     const imageSrc = document.querySelector("img.eCPON").getAttribute('src');
            //     //     return imageSrc;
            //     // })
            //     const singlePlaceDetail = {
            //         title,
            //         address,
            //         newUrl,
            //         // details
            //     }
            //     data.push(singlePlaceDetail);
            // }
            // return data;
            return Array.from(document.querySelectorAll('div.result')).map(el=>{
                const detailEndpoint = el.querySelector('div.result-content-columns').getAttribute('onclick').split(',')[el.querySelector('div.result-content-columns').getAttribute('onclick').split(',').indexOf(' this')+1].replace(/'/g, '').replace(' ','');
                const newUrl = "https://www.tripadvisor.com"+ detailEndpoint;

                // const page2 = await browser.newPage();
                // await page2.goto(newUrl, {waitUntil: 'networkidle0'});
                // const details = await page2.evaluate(()=>{
                //     const imageSrc = document.querySelector("img.eCPON").getAttribute('src');
                // })
                return {
                    title: el.querySelector('div.result-title').innerText.trim(),
                    address: el.querySelector('div.address-text').innerText,
                    attribute:newUrl
                }
            }
            )
            
        });
        console.log(webdata);
        await browser.close();
        // const finalData=[];
        // for(i=0; i<webdata.length; i++){
        //         let newData = {};
        // //     await page.goto(webdata[i].newUrl, {waitUntil: 'networkidle0'});
        // //     const details = await page.evaluate(()=>{
        // //         const imageSrc = document.querySelector("img.eCPON").getAttribute('src');
        // //         return imageSrc;
        // //     })
        // //     newData = {...webdata[i], details};
        // //     finalData.push(newData);
        // // }
        // // console.log(finalData);
        // // await browser.close();
        //     const moreData = await getData(webdata[i].newUrl);
        //     newData = {...webdata[i], moreData};
        //     finalData.push(newData)
        // }
        // console.log(finalData);
    }catch(ex){
        console.log(ex);
    }
    let endtime = performance.now();
    console.log(`Time taken ${(endtime-startTime)/1000} seconds`);
})();