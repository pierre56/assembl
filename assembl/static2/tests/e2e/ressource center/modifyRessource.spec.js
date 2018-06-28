import puppeteer from 'puppeteer';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('ressource center E2E test', () => {
  it(
    'should be able to add a new ressource',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(3000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.adminEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(3000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter');
      await page.waitFor(3000);
      await page.click('input[placeholder=\'Titre de la page\']');
      await page.type('input[placeholder=\'Titre de la page\']', 'titre de la page modifiée');
      const imagePath = '/Users/felix/projects/assembl/assembl/static2/tests/e2e/images/imageupload2.jpeg';
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath);
      await page.waitFor(3000);
      await page.click('input[placeholder=\'Titre*\']');
      await page.type('input[placeholder=\'Titre*\']', 'titre du média modifiée');
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'Du texte du texte du texte modifiée');
      const imageInput = await page.$('input[name^="image"]');
      await imageInput.uploadFile(imagePath);
      //   const documentinput = await page.$('input[name^="document"]');
      //   await documentinput.uploadFile(filePath);
      await page.waitFor(3000);
      await page.click(
        '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > button'
      );
      await page.waitFor(3000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter');
      await page.waitFor(3000);
      await browser.close();
    },
    50000
  );
});