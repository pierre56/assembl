import 'raf/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import './helpers/setupTranslations';

Object.defineProperty(document, 'cookie', {
  value: 'assembl_session=1234; _LOCALE_=fr; _pk_id.abcd1234=1234;',
  writable: true
});

jest.spyOn(Date, 'now').mockImplementation(() => new Date('2018-09-27T12:54:59.218Z').getTime());