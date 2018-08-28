import puppeteer from 'puppeteer';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('Sign up/Sign in E2E test', () => {
  it(
    'should be able to log in to the platform',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/', {
        waitUntil: 'networkidle2',
        timeout: 50000
      });
      // fill up the signin form
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.userEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.userPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(10000);
      // check if the profile menu is visible
      const profileMenu = await page.$eval('#user-dropdown', el => !!el);
      expect(profileMenu).toBe(true);
      await browser.close();
    },
    50000
  );
});