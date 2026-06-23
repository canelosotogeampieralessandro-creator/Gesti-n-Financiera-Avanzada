import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Clicking button to enter dashboard");
  // Assuming CoverPage has a button to enter
  const btn = await page.$('button');
  if (btn) await btn.click();
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Clicking 'Análisis de la fuente de financiamiento'");
  const menuItems = await page.$$('button');
  for (const item of menuItems) {
    const text = await page.evaluate(el => el.textContent, item);
    if (text.includes('Análisis de la fuente de financiamiento')) {
      await item.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Clicking 'Evolución'");
  const subItems = await page.$$('button');
  for (const item of subItems) {
    const text = await page.evaluate(el => el.textContent, item);
    if (text.includes('Evolución')) {
      await item.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
})();
