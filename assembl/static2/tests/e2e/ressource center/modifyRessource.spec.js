import puppeteer from 'puppeteer';
import selectors from '../selectors';
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
      const imagePath2 = selectors.newRessource.imagePath2;
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath2);
      await page.waitFor(3000);
      await page.click(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`, 'titre du média modifiée');
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'Du texte du texte du texte et encore du texte');
      const imageInput = await page.$('input[name^="image"]');
      await imageInput.uploadFile(imagePath2);
      await page.click(`textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`);
      await page.type(
        `textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`,
        'https://www.youtube.com/embed/4DkeNh3YCys'
      );
      await page.waitFor(5000);
      await page.click(selectors.newRessource.saveButton);
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter');
      await page.waitFor(5000);
      await browser.close();
    },
    50000
  );
});