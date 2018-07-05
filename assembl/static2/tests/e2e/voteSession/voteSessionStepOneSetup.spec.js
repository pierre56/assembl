import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('I can set up a vote phase', () => {
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
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/discussion?section=1');
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/voteSession?section=1');
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.voteSession.headerTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.voteSession.headerTitlePlaceholder}']`, 'titre du bandeau FR');
      await page.click(`input[placeholder='${selectors.voteSession.headerSubtitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.voteSession.headerSubtitlePlaceholder}']`, 'sous titre du bandeau FR');
      const imagePath = selectors.newRessource.imagePath;
      const input = await page.$('input[name=header-image]');
      await input.uploadFile(imagePath);
      await page.click(`input[placeholder='${selectors.voteSession.consigneTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.voteSession.consigneTitlePlaceholder}']`, 'titre de la consigne FR');
      await page.click('div[role=\'textbox\']');
      await page.type('div[role=\'textbox\']', 'Du texte du texte du texte');
      await page.click(`input[placeholder='${selectors.voteSession.sectionTitlePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.voteSession.sectionTitlePlaceholder}']`, 'titre de la section FR');
      await page.click(selectors.voteSession.sectionOneSaveButton);
      await page.waitFor(3000);
      const sucessSave = await page.$eval('.showAlert', el => !!el);
      expect(sucessSave).toBe(true);
      await page.waitFor(2000);
      await page.click(selectors.voteSession.nextSectionArrow);
      await page.waitFor(5000);
      await browser.close();
    },
    70000
  );
});