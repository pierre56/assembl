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
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/voteSession?section=2');
      await page.waitFor(5000);
      await page.click(selectors.voteSession.tokenCheckbox);
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.voteSession.tokenConsignePlaceholder}']`);
      await page.type(`input[placeholder='${selectors.voteSession.tokenConsignePlaceholder}']`, 'consigne du vote par jetons FR');
      await page.click(selectors.voteSession.tokenNumberSelectionDropdown);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.tokenNumberSelection);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.firstTokenName);
      await page.type(selectors.voteSession.firstTokenName, 'intitulé du jeton 1 FR');
      await page.click(selectors.voteSession.firstTokenNumber);
      await page.type(selectors.voteSession.firstTokenNumber, '0');
      await page.click(selectors.voteSession.secondTokenName);
      await page.type(selectors.voteSession.secondTokenName, 'intitulé du jeton 2 FR');
      await page.click(selectors.voteSession.secondTokenNumber);
      await page.type(selectors.voteSession.secondTokenNumber, '0');
      await page.click(selectors.voteSession.evolutionCheckbox);
      await page.click(selectors.voteSession.sectionOneSaveButton);
      await page.waitFor(3000);
      const sucessSave = await page.$eval('.showAlert', el => !!el);
      expect(sucessSave).toBe(true);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.nextSectionArrow);
      await page.waitFor(5000);
      await browser.close();
    },
    70000
  );
});