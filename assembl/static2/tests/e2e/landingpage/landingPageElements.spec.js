import puppeteer from 'puppeteer';
import data from '../../../../../configs/bluenove-server-configs/dev-assembl.config.json';
import selectors from '../selectors';

describe('The principal elements of the landing page are here', () => {
  it(
    'should be able to log in to the platform',
    async () => {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });
      await page.goto('https://dev-assembl.bluenove.com/felixdebate/login/');
      await page.waitFor(5000);
      // fill up the signin form
      await page.click('input[name=identifier]');
      await page.type('input[name=identifier]', data.adminEmail);
      await page.click('input[name=password]');
      await page.type('input[name=password]', data.adminPassword);
      await page.click('button[value=\'Se connecter\']');
      await page.waitFor(5000);
      // check if the principal elements of the landing page are here
      const navbar = await page.$eval('.nav-bar', el => !!el);
      expect(navbar).toBe(true);
      const searchInput = await page.$eval('.sk-search-box', el => !!el);
      expect(searchInput).toBe(true);
      const userDropdown = await page.$eval('#user-dropdown', el => !!el);
      expect(userDropdown).toBe(true);
      const headerSection = await page.$eval('.header-section', el => !!el);
      expect(headerSection).toBe(true);
      const headerTitle = await page.$eval(selectors.landingPage.headerTitle, el => !!el);
      expect(headerTitle).toBe(true);
      const headerSubtitle = await page.$eval(selectors.landingPage.headerSubtitle, el => !!el);
      expect(headerSubtitle).toBe(true);
      const submitButton = await page.$eval('.button-submit', el => !!el);
      expect(submitButton).toBe(true);
      const statistic = await page.$eval('.statistic', el => !!el);
      expect(statistic).toBe(true);
      const objectiveSection = await page.$eval('.objectives-section', el => !!el);
      expect(objectiveSection).toBe(true);
      const objectiveImg = await page.$eval('.objectives-img', el => !!el);
      expect(objectiveImg).toBe(true);
      const objectiveText = await page.$eval('.objectives', el => !!el);
      expect(objectiveText).toBe(true);
      const phaseSection = await page.$eval('.phases-section', el => !!el);
      expect(phaseSection).toBe(true);
      const phaseBox = await page.$eval('.illustration-box', el => !!el);
      expect(phaseBox).toBe(true);
      const timelineBar = await page.$eval('.bar', el => !!el);
      expect(timelineBar).toBe(true);
      const videoSection = await page.$eval('.video-section', el => !!el);
      expect(videoSection).toBe(true);
      const titleVideoSection = await page.$eval(selectors.landingPage.titleVideoSection, el => !!el);
      expect(titleVideoSection).toBe(true);
      const TextVideoSection = await page.$eval('#video-txt', el => !!el);
      expect(TextVideoSection).toBe(true);
      const videoFrame = await page.$eval('#video-vid', el => !!el);
      expect(videoFrame).toBe(true);
      const twitterSection = await page.$eval('.twitter-section', el => !!el);
      expect(twitterSection).toBe(true);
      const tweetContainer = await page.$eval('.tweet-container', el => !!el);
      expect(tweetContainer).toBe(true);
      const TitleTwitterSection = await page.$eval(selectors.landingpage.TitleTwitterSection, el => !!el);
      expect(TitleTwitterSection).toBe(true);
      const barbaraSection = await page.$eval('.contact-section', el => !!el);
      expect(barbaraSection).toBe(true);
      const partnersSection = await page.$eval('.partners-section', el => !!el);
      expect(partnersSection).toBe(true);
      const partnerLogo = await page.$eval('.partner-logo', el => !!el);
      expect(partnerLogo).toBe(true);
      const footer = await page.$eval('#footer', el => !!el);
      expect(footer).toBe(true);
      const languageDropdown = await page.$eval('#nav-dropdown', el => !!el);
      expect(languageDropdown).toBe(true);
      await browser.close();
    },

    50000
  );
});