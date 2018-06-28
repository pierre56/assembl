import puppeteer from 'puppeteer';
import selectors from '../selectors';

describe('ressource center E2E test', () => {
  it(
    'should be able to add a new ressource',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(5000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', selectors.generalInformation.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', selectors.generalInformation.newPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter');
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.newRessource.pageTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.newRessource.pageTitlePlaceholder}']`, 'titre de la page');
      const imagePath = selectors.newRessource.imagePath;
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath);
      await page.click(selectors.newRessource.addRessourceButton);
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.newRessource.mediaTitlePlaceholder}']`);
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'Du texte du texte du texte');
      await page.click(`textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`);
      await page.type(
        `textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`,
        'https://www.youtube.com/embed/z4PKzz81m5c'
      );
      const imageInput = await page.$('input[name^="image"]');
      await imageInput.uploadFile(imagePath);
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