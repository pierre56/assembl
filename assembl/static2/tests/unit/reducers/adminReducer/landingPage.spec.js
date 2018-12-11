import { List, Map } from 'immutable';

import * as actionTypes from '../../../../js/app/actions/actionTypes';
import * as reducers from '../../../../js/app/reducers/adminReducer/landingPage';
import { modulesById } from '../../components/administration/landingPage/fakeData';

describe('Landing page enabledModulesInOrder reducer', () => {
  const reducer = reducers.enabledModulesInOrder;
  it('it should return the initial state', () => {
    const action = {};
    const expected = List();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should return the current state for other actions', () => {
    const action = { type: 'FOOBAR' };
    const oldState = List.of('HEADER', 'INTRODUCTION', 'FOOTER');
    expect(reducer(oldState, action)).toEqual(oldState);
  });

  it('should handle TOGGLE_LANDING_PAGE_MODULE action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.TOGGLE_LANDING_PAGE_MODULE
    };
    const oldState = List.of('def456', 'abc123', 'ghi789', 'jkl135');
    const expected = List.of('def456', 'ghi789', 'jkl135');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
    const twice = reducer(actual, action);
    const twiceExpected = List.of('def456', 'ghi789', 'abc123', 'jkl135');
    expect(twice).toEqual(twiceExpected);
  });

  it('should handle UPDATE_LANDING_PAGE_MODULES action type', () => {
    const action = {
      modules: modulesById.map(v => v.toJS()).toArray(),
      type: actionTypes.UPDATE_LANDING_PAGE_MODULES
    };
    const oldState = List();
    const expected = List.of('abc123', 'ghi789', 'jkl865');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_DOWN action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_DOWN
    };
    const oldState = List.of('def456', 'abc123', 'ghi789', 'jkl135');
    const expected = List.of('def456', 'ghi789', 'abc123', 'jkl135');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_DOWN action type, no change if module is the last before FOOTER', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_DOWN
    };
    const oldState = List.of('def456', 'ghi789', 'abc123', 'jkl135');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(oldState);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_UP action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_UP
    };
    const oldState = List.of('def456', 'ghi789', 'abc123', 'jkl135');
    const expected = List.of('def456', 'abc123', 'ghi789', 'jkl135');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_UP action type, no change if module is the first after HEADER', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_UP
    };
    const oldState = List.of('def456', 'abc123', 'ghi789', 'jkl135');
    const actual = reducer(oldState, action);
    expect(actual).toEqual(oldState);
  });
});

describe('Landing page modulesById reducer', () => {
  const reducer = reducers.modulesById;
  it('it should return the initial state', () => {
    const action = {};
    const expected = Map();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should return the current state for other actions', () => {
    const action = { type: 'FOOBAR' };
    const oldState = Map({
      abc123: Map({ identifier: 'HEADER', enabled: true, order: 1.0, id: 'abc123' })
    });
    expect(reducer(oldState, action)).toEqual(oldState);
  });

  it('should handle TOGGLE_LANDING_PAGE_MODULE action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.TOGGLE_LANDING_PAGE_MODULE
    };
    const oldState = Map({
      abc123: Map({ identifier: 'HEADER', enabled: true, order: 1.0, id: 'abc123', _hasChanged: true })
    });
    const expected = Map({
      abc123: Map({ identifier: 'HEADER', enabled: false, order: 1.0, id: 'abc123', _hasChanged: true })
    });
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
    const twice = reducer(actual, action);
    expect(twice).toEqual(oldState);
  });

  it('should handle UPDATE_LANDING_PAGE_MODULES action type', () => {
    const action = {
      modules: modulesById.map(v => v.toJS()).toArray(),
      type: actionTypes.UPDATE_LANDING_PAGE_MODULES
    };
    const oldState = Map();
    const expected = modulesById;
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });
});

describe('Landing page modulesHasChanged reducer', () => {
  const reducer = reducers.modulesHasChanged;
  it('it should return the initial state', () => {
    const action = {};
    const expected = false;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should return the current state for other actions', () => {
    const action = { type: 'FOOBAR' };
    const oldState = true;
    expect(reducer(oldState, action)).toEqual(oldState);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_UP action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_UP
    };
    const oldState = false;
    const expected = true;
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle MOVE_LANDING_PAGE_MODULE_DOWN action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.MOVE_LANDING_PAGE_MODULE_DOWN
    };
    const oldState = false;
    const expected = true;
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle TOGGLE_LANDING_PAGE_MODULE action type', () => {
    const action = {
      id: 'abc123',
      type: actionTypes.TOGGLE_LANDING_PAGE_MODULE
    };
    const oldState = false;
    const expected = true;
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });

  it('should handle UPDATE_LANDING_PAGE_MODULES action type', () => {
    const action = {
      modules: modulesById.map(v => v.toJS()).toArray(),
      type: actionTypes.UPDATE_LANDING_PAGE_MODULES
    };
    const oldState = true;
    const expected = false;
    const actual = reducer(oldState, action);
    expect(actual).toEqual(expected);
  });
});