const puppeteer = require("puppeteer");

// (async()=>{
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     const url = "https://www.tripadvisor.com/Restaurant_Review-g32530-d787729-Reviews-In_N_Out_Burger-Irvine_California.html";
//     await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});

//     const data = await page.evaluate(async()=>{
//            const imageSrc = document.querySelector("img.eCPON").getAttribute('src');
//            return imageSrc;
//     });
//     console.log(data);
//     await browser.close();

// })();

async function getData(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //const url = "https://www.tripadvisor.com/Restaurant_Review-g32530-d787729-Reviews-In_N_Out_Burger-Irvine_California.html";
    await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});

    const data = await page.evaluate(async()=>{
           const imageSrc = document.querySelector("img.eCPON").getAttribute('src');
           return imageSrc;
    });
    console.log(data);
    await browser.close();
    return data;
}

module.exports = {getData};