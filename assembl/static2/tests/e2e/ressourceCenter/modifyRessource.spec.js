import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('ressource center E2E test', () => {
  it(
    'should be able to modify the ressource',
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
      const titleInputValue = await page.$eval('input[placeholder=\'Titre de la page\']', el => el.value);
      for (let i = 0; i < titleInputValue.length; i + 1) {
        page.keyboard.press('Backspace');
      }
      await page.type('input[placeholder=\'Titre de la page\']', 'titre de la page modifiée');
      const imagePath2 = selectors.newRessource.imagePath2;
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath2);
      await page.waitFor(3000);
      await page.click(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`);
      const mediaInputValue = await page.$eval(
        `input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`,
        el => el.value
      );
      for (let i = 0; i < mediaInputValue.length; i + 1) {
        page.keyboard.press('Backspace');
      }

      await page.type(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`, 'titre du média modifiée');
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'encore du texte');
      const imageInput = await page.$('input[name^="image"]');
      await imageInput.uploadFile(imagePath2);
      await page.click(`textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`);
      const videoInputValue = await page.$eval(
        `textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`,
        el => el.value
      );
      for (let i = 0; i < videoInputValue.length; i + 1) {
        page.keyboard.press('Backspace');
      }
      await page.type(
        `textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`,
        'https://www.youtube.com/embed/4DkeNh3YCys'
      );
      await page.waitFor(5000);
      await page.click(selectors.newRessource.saveButton);

      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter');
      await page.waitFor(5000);
      const resourceBlock = await page.$eval('.resource-block', el => !!el);
      expect(resourceBlock).toBe(true);
      const resourceImage = await page.$eval('.resource-img', el => !!el);
      expect(resourceImage).toBe(true);
      const titleSection = await page.$eval('.title-section', el => !!el);
      expect(titleSection).toBe(true);
      const resourceText = await page.$eval('.resource-text', el => !!el);
      expect(resourceText).toBe(true);
      await browser.close();
    },
    50000
  );
});