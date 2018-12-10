import {
  getNumberOfDays,
  calculatePercentage,
  getBasename,
  hexToRgb,
  encodeUserIdBase64,
  isHarvestable,
  moveElementToFirstPosition,
  getPostPublicationState
} from '../../../js/app/utils/globalFunctions';

describe('This test concern GlobalFunctions Class', () => {
  it('Should return the number of days between 2 dates', () => {
    const expectedResult = [14, 31, 90, 92, 365];
    const datesArray = [
      {
        date1: '2017-02-14T00:00:00Z',
        date2: '2017-02-28T00:00:00Z'
      },
      {
        date1: '2017-03-01T00:00:00Z',
        date2: '2017-04-01T00:00:00Z'
      },
      {
        date1: '2017-01-01T00:00:00Z',
        date2: '2017-04-01T00:00:00Z'
      },
      {
        date1: '2017-05-01T00:00:00Z',
        date2: '2017-08-01T00:00:00Z'
      },
      {
        date1: '2017-01-01T00:00:00Z',
        date2: '2018-01-01T00:00:00Z'
      }
    ];
    const result = datesArray.map((elm) => {
      const date1 = new Date(elm.date1);
      const date2 = new Date(elm.date2);
      const days = getNumberOfDays(date2, date1);
      return days;
    });
    expect(result).toEqual(expectedResult);
  });

  it('Should return a percentage', () => {
    const expectedResult = [43.48, 7.49, 7.8];
    const arr = [
      {
        value: 10,
        total: 23
      },
      {
        value: 32,
        total: 427
      },
      {
        value: 684,
        total: 8765
      }
    ];
    const result = arr.map((elm) => {
      const percentage = calculatePercentage(elm.value, elm.total);
      return percentage;
    });
    expect(result).toEqual(expectedResult);
  });
});

describe('getBasename function', () => {
  it('should return the basename of a windows style path', () => {
    const path = 'C:\\Documents\\foobar.jpg';
    const expected = 'foobar.jpg';
    expect(getBasename(path)).toEqual(expected);
  });

  it('should return the basename of a linux style path', () => {
    const path = '/home/johndoe/Documents/foobar.jpg';
    const expected = 'foobar.jpg';
    expect(getBasename(path)).toEqual(expected);
  });
});

describe('hexToRgb function', () => {
  it('should return a color\'s RGB components from the hexadecimal code', () => {
    const colors = [{ hexa: '#40A497' }, { hexa: '#A44072' }, { hexa: '#4051A4' }, { hexa: '#FDEC00' }];
    const expectedResult = [{ rgb: '64,164,151' }, { rgb: '164,64,114' }, { rgb: '64,81,164' }, { rgb: '253,236,0' }];
    const result = colors.map(color => ({ rgb: hexToRgb(color.hexa) }));
    expect(result).toEqual(expectedResult);
  });
});

describe('encodeUserIdBase64 function', () => {
  it('should return the encoded user id', () => {
    const userId = '123';
    const expectedResult = 'QWdlbnRQcm9maWxlOjEyMw=='; // btoa(`AgentProfile:${userId}`)
    const result = encodeUserIdBase64(userId);
    expect(result).toEqual(expectedResult);
  });

  it('should return a null encoded user id', () => {
    const userId = null;
    const expectedResult = null;
    const result = encodeUserIdBase64(userId);
    expect(result).toEqual(expectedResult);
  });
});

describe('isHarvestable function', () => {
  it('should return false if content is not harvestable', () => {
    const params = {
      phase: 'survey'
    };
    expect(isHarvestable(params)).toBeFalsy();
  });

  it('should return true if content is harvestable', () => {
    const params = {
      phase: 'thread'
    };
    expect(isHarvestable(params)).toBeTruthy();
  });

  it('should return true if content is harvestable', () => {
    const params = {
      phase: 'multiColumns'
    };
    expect(isHarvestable(params)).toBeTruthy();
  });
});

describe('moveElementToFirstPosition function', () => {
  it('should put bar as the first element of the array', () => {
    const array = ['foo', 'bar', 'baz'];
    const element = 'bar';
    expect(moveElementToFirstPosition(array, element)).toEqual(['bar', 'foo', 'baz']);
  });
});

describe('getPostPublicationState function', () => {
  it('should be PUBLISHED if debate is not moderated', () => {
    const isDebateModerated = false;
    const connectedUserIsAdmin = false;
    const actual = getPostPublicationState(isDebateModerated, connectedUserIsAdmin);
    const expected = 'PUBLISHED';
    expect(actual).toEqual(expected);
  });

  it('should be PUBLISHED if debate is moderated and user is admin', () => {
    const isDebateModerated = true;
    const connectedUserIsAdmin = true;
    const actual = getPostPublicationState(isDebateModerated, connectedUserIsAdmin);
    const expected = 'PUBLISHED';
    expect(actual).toEqual(expected);
  });

  it('should be SUBMITTED_AWAITING_MODERATION if debate is moderated and user is not admin', () => {
    const isDebateModerated = true;
    const connectedUserIsAdmin = false;
    const actual = getPostPublicationState(isDebateModerated, connectedUserIsAdmin);
    const expected = 'SUBMITTED_AWAITING_MODERATION';
    expect(actual).toEqual(expected);
  });
});