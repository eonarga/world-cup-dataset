const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.npmjs.com');
    await page.screenshot({ path: 'img.png' });

    await browser.close();

})();
