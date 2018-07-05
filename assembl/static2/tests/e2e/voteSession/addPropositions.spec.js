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
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/administration/voteSession?section=3');
      await page.waitFor(5000);
      await page.click(selectors.voteSession.addPropositionButton);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.propositionTitle);
      await page.type(selectors.voteSession.propositionTitle, 'titre de la proposition');
      await page.click(selectors.voteSession.propositionDescription);
      await page.type(selectors.voteSession.propositionDescription, 'description de la proposition');
      await page.click(selectors.voteSession.addPropositionButton);
      await page.waitFor(3000);
      await page.click(selectors.voteSession.secondPropositionTitle);
      await page.type(selectors.voteSession.secondPropositionTitle, 'titre de la proposition deux');
      await page.click(selectors.voteSession.secondPropositionDescription);
      await page.type(selectors.voteSession.secondPropositionDescription, 'description de la proposition deux');
      await page.click(selectors.voteSession.sectionOneSaveButton);
      await page.waitFor(3000);
      const sucessSave = await page.$eval('.showAlert', el => !!el);
      expect(sucessSave).toBe(true);
      const checkFirstProposal = await page.$eval('#proposal-form-1', el => !!el);
      expect(checkFirstProposal).toBe(true);
      const checkSecondProposal = await page.$eval('#proposal-form-2', el => !!el);
      expect(checkSecondProposal).toBe(true);
      await page.waitFor(3000);
      await browser.close();
    },
    70000
  );
});