import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('ressource center E2E test', () => {
  it(
    'should be able to add an image',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(5000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.adminEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter');
      await page.waitFor(5000);
      const imagePath = selectors.newRessource.imagePath;
      const imageInput = await page.$('input[name^="image"]');
      await imageInput.uploadFile(imagePath);
      await page.waitFor(5000);
      await page.click(selectors.newRessource.saveButton);
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter');
      await page.waitFor(5000);
      const resourceImage = await page.$eval('.resource-img', el => !!el);
      expect(resourceImage).toBe(true);
      await browser.close();
    },
    50000
  );
});