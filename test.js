import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:5173');
  
  // wait for it to load
  await page.waitForTimeout(2000);
  
  // click "Análisis de la fuente de financiamiento"
  // wait, the user said "cuando hago clik en evolucion"
  // Let's just evaluate something
  await page.evaluate(() => {
    // We can simulate the click or just see if there are global errors
  });

  await browser.close();
})();
