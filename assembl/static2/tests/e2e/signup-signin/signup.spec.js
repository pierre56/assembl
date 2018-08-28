import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('Sign up/Sign in E2E test', () => {
  const randomNumber = Math.floor(Math.random() * Math.floor(100000));
  const lead = {
    username: `assembltest${randomNumber}`
  };

  it(
    'should be able to sign up',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/signup/', {
        waitUntil: 'networkidle2',
        timeout: 50000
      });
      await page.click('input[name=fullname]');
      await page.type('input[name=fullname]', selectors.generalInformation.name);
      await page.click('input[name=username]');
      await page.type('input[name=username]', lead.username);
      await page.click('input[name=email]');
      await page.type('input[name=email]', data.userEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.userPassword);
      await page.click('input[name=password2]');
      await page.type('input[name=password2]', data.userPassword);
      await page.click('input[type=checkbox]');
      await page.click('button[type=submit]');
      await page.waitFor(5000);
      const confirmModal = await page.$eval('.resendPwd', el => !!el);
      expect(confirmModal).toBe(true);
      await browser.close();
    },
    16000
  );
});