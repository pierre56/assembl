import puppeteer from 'puppeteer';
import selectors from '../selectors';

describe('Sign up/Sign in E2E test', () => {
  it(
    'should be able to change my password',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(5000);
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', selectors.generalInformation.email);
      await page.click('input[name=password]');
      await page.type('input[name=password]', selectors.generalInformation.password);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(10000);
      await page.click('#user-dropdown');
      await page.click('a[role=menuitem]');
      await page.waitFor(10000);
      await page.click(selectors.passwordChange.modifyPasswordButton);
      await page.waitFor(5000);
      await page.click(`input[placeholder='${selectors.passwordChange.actualPasswordPlaceholder}']`);
      await page.type(
        `input[placeholder='${selectors.passwordChange.actualPasswordPlaceholder}']`,
        selectors.generalInformation.password
      );
      await page.click(`input[placeholder='${selectors.passwordChange.newPasswordPlaceholder}']`);
      await page.type(
        `input[placeholder='${selectors.passwordChange.newPasswordPlaceholder}']`,
        selectors.generalInformation.newPassword
      );
      await page.click(`input[placeholder='${selectors.passwordChange.confirmNewPasswordPlaceholder}']`);
      await page.type(
        `input[placeholder='${selectors.passwordChange.confirmNewPasswordPlaceholder}']`,
        selectors.generalInformation.newPassword
      );
      await page.click(selectors.passwordChange.saveNewPassword);
      await page.waitFor(2000);

      await browser.close();
    },
    50000
  );
});