import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('I can set up a vote phase', () => {
  it(
    'should be able to delete a ressource',
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
      await page.waitFor(10000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/discussion?section=5');
      await page.waitFor(5000);
      await page.click(selectors.voteSession.phaseTrash);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.sectionOneSaveButton);
      await page.waitFor(3000);
      const sucessSave = await page.$eval('.showAlert', el => !!el);
      expect(sucessSave).toBe(true);
      await browser.close();
    },
    70000
  );
});