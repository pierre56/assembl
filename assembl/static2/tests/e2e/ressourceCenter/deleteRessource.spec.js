import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('ressource center E2E test', () => {
  it(
    'should be able to delete a ressource',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(5000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.adminEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(10000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter');
      await page.waitFor(5000);
      await page.click('input[placeholder=\'Titre de la page\']');
      const titleInputValue = await page.$eval('input[placeholder=\'Titre de la page\']', el => el.value);
      for (let i = 0; i < titleInputValue.length; i + 1) {
        page.keyboard.press('Backspace');
      }
      await page.evaluate(() => {
        document.querySelector('.admin-icons').click();
      });
      await page.click(selectors.newRessource.saveButton);
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter');
      await page.waitFor(5000);
      const resourceBlock = await page.$eval('.resource-block', el => !!el);
      expect(resourceBlock).toBe(false);
      await browser.close();
    },
    50000
  );
});