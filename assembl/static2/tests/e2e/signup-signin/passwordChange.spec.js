import puppeteer from 'puppeteer';
import selectors from '../selectors';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';

describe('Sign up/Sign in E2E test', () => {
  it(
    'should be able to change my password',
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
      await page.type('input[name=identifier]', data.userEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.userPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(10000);
      await page.click('#user-dropdown');
      await page.click('a[role=menuitem]');
      await page.waitFor(10000);
      await page.click(selectors.passwordChange.modifyPasswordButton);
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.passwordChange.actualPasswordPlaceholder}']`);
      await page.type(`input[placeholder='${selectors.passwordChange.actualPasswordPlaceholder}']`, data.userPassword);
      await page.click(`input[placeholder='${selectors.passwordChange.newPasswordPlaceholder}']`);
      await page.type(`input[placeholder='${selectors.passwordChange.newPasswordPlaceholder}']`, data.userNewPassword);
      await page.click(`input[placeholder='${selectors.passwordChange.confirmNewPasswordPlaceholder}']`);
      await page.type(`input[placeholder='${selectors.passwordChange.confirmNewPasswordPlaceholder}']`, data.userNewPassword);
      await page.click(selectors.passwordChange.saveNewPassword);
      await page.waitFor(2000);

      await browser.close();
    },
    50000
  );
});