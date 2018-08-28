import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('ressource center E2E test', () => {
  it(
    'should be able to add a new ressource with a video',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/', {
        waitUntil: 'networkidle2',
        timeout: 50000
      });
      await page.waitFor(5000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.adminEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/resourcesCenter', {
        waitUntil: 'networkidle2',
        timeout: 50000
      });
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.newRessource.pageTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.newRessource.pageTitlePlaceholder}']`, 'titre de la page');
      const imagePath = selectors.newRessource.imagePath;
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath);
      await page.click(selectors.newRessource.addRessourceButton);
      await page.waitFor(5000);
      await page.click(selectors.newRessource.fistMediaTitle);
      await page.type(selectors.newRessource.fistMediaTitle, 'titre du média');
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'Du texte du texte du texte');
      await page.click(`textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`);
      await page.type(
        `textarea[placeholder='${selectors.newRessource.videoTextPlaceholder}']`,
        'https://www.youtube.com/embed/z4PKzz81m5c'
      );
      await page.waitFor(5000);
      await page.click(selectors.newRessource.saveButton);
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/resourcescenter', {
        waitUntil: 'networkidle2',
        timeout: 50000
      });
      await page.waitFor(5000);
      const resourceBlock = await page.$eval('.resource-block', el => !!el);
      expect(resourceBlock).toBe(true);
      const titleSection = await page.$eval('.title-section', el => !!el);
      expect(titleSection).toBe(true);
      const resourceText = await page.$eval('.resource-text', el => !!el);
      expect(resourceText).toBe(true);
      await browser.close();
    },
    100000
  );
});