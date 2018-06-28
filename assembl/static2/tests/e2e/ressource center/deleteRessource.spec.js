import puppeteer from 'puppeteer';

describe('ressource center E2E test', () => {
  const lead = {
    name: 'puppeteertest1',
    email: 'testassembl@gmail.com',
    password: 'coucou'
  };

  it(
    'should be able to delete a ressource',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(3000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', lead.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', lead.password);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(3000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter');
      await page.waitFor(5000);
      await page.evaluate(() => {
        document.querySelector('.admin-icons').click();
      });
      await page.click(
        '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > button'
      );
      await page.waitFor(3000);
      await browser.close();
    },
    50000
  );
});