import puppeteer from 'puppeteer';
import selectors from '../selectors';

describe('Sign up/Sign in E2E test', () => {
  it(
    'should be able to log in to the platform',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(3000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', selectors.generalInformation.adminMail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', selectors.generalInformation.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(5000);
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(10000);
      await browser.close();
    },
    30000
  );
});