// @flow
import { fromJS, List, Map } from 'immutable';
import { combineReducers } from 'redux';
import type ReduxAction from 'redux';
import { updateInLangstringEntries } from '../../utils/i18n';
import {
  type Action,
  CREATE_LANDING_PAGE_MODULE,
  MOVE_LANDING_PAGE_MODULE_DOWN,
  MOVE_LANDING_PAGE_MODULE_UP,
  TOGGLE_LANDING_PAGE_MODULE,
  UPDATE_LANDING_PAGE_MODULES,
  UPDATE_LANDING_PAGE_MODULE_TITLE,
  UPDATE_LANDING_PAGE_MODULE_SUBTITLE
} from '../../actions/actionTypes';

type ModulesHasChangedReducer = (boolean, ReduxAction<Action>) => boolean;
export const modulesHasChanged: ModulesHasChangedReducer = (state = false, action) => {
  switch (action.type) {
  case CREATE_LANDING_PAGE_MODULE:
  case MOVE_LANDING_PAGE_MODULE_UP:
  case MOVE_LANDING_PAGE_MODULE_DOWN:
  case UPDATE_LANDING_PAGE_MODULE_TITLE:
  case UPDATE_LANDING_PAGE_MODULE_SUBTITLE:
  case TOGGLE_LANDING_PAGE_MODULE:
    return true;
  case UPDATE_LANDING_PAGE_MODULES:
    return false;
  default:
    return state;
  }
};

type ModulesInOrderState = List<string>;
type ModulesInOrderReducer = (ModulesInOrderState, ReduxAction<Action>) => ModulesInOrderState;
export const modulesInOrder: ModulesInOrderReducer = (state = List(), action) => {
  switch (action.type) {
  case UPDATE_LANDING_PAGE_MODULES:
    return List(action.modules.map(module => module.id));
  case CREATE_LANDING_PAGE_MODULE:
    // insert at the end (just before FOOTER module)
    return state.insert(state.size - 1, action.id);
  default:
    return state;
  }
};

type EnabledModulesInOrderState = List<string>;
type EnabledModulesInOrderReducer = (EnabledModulesInOrderState, ReduxAction<Action>) => EnabledModulesInOrderState;
export const enabledModulesInOrder: EnabledModulesInOrderReducer = (state = List(), action) => {
  switch (action.type) {
  case CREATE_LANDING_PAGE_MODULE:
    // insert at the end (just before FOOTER module)
    return state.insert(state.size - 1, action.id);
  case MOVE_LANDING_PAGE_MODULE_UP: {
    const idx = state.indexOf(action.id);
    if (idx === 1) {
      return state;
    }
    return state.delete(idx).insert(idx - 1, action.id);
  }
  case MOVE_LANDING_PAGE_MODULE_DOWN: {
    const idx = state.indexOf(action.id);
    if (idx === state.size - 2) {
      return state;
    }

    return state.delete(idx).insert(idx + 1, action.id);
  }
  case TOGGLE_LANDING_PAGE_MODULE: {
    const id = action.id;
    const idx = state.indexOf(id);
    if (idx !== -1) {
      return state.delete(idx);
    }

    // insert at the end (just before FOOTER module)
    return state.insert(state.size - 1, id);
  }
  case UPDATE_LANDING_PAGE_MODULES:
    return List(action.modules.filter(module => module.enabled).map(module => module.id));
  default:
    return state;
  }
};

const defaultResource = Map({
  _toDelete: false,
  _hasChanged: false,
  enabled: true,
  existsInDatabase: false,
  moduleType: Map({
    editableOrder: true,
    required: false
  })
});

const initialState = Map();
type ModulesByIdState = Map<string, Map>;
type ModulesByIdReducer = (ModulesByIdState, ReduxAction<Action>) => ModulesByIdState;
export const modulesById: ModulesByIdReducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_LANDING_PAGE_MODULE:
    return state.set(
      action.id,
      defaultResource
        .setIn(['moduleType', 'moduleId'], action.id)
        .setIn(['moduleType', 'identifier'], action.identifier)
        .setIn(['moduleType', 'title'], `${action.title} ${action.numberOfDuplicatesModules}`)
        .set('order', action.order)
        .set('id', action.id)
    );
  case TOGGLE_LANDING_PAGE_MODULE: {
    const moduleType = action.id;
    return state.updateIn([moduleType, 'enabled'], v => !v).setIn([moduleType, '_hasChanged'], true);
  }
  case MOVE_LANDING_PAGE_MODULE_UP: {
    let newState = Map();
    state.forEach((module) => {
      const id = module.get('id');
      newState = newState.set(id, fromJS(module)).setIn([id, '_hasChanged'], true);
    });
    return state;
  }
  case MOVE_LANDING_PAGE_MODULE_DOWN: {
    let newState = Map();
    state.forEach((module) => {
      const id = module.get('id');
      newState = newState.set(id, fromJS(module)).setIn([id, '_hasChanged'], true);
    });
    return state;
  }
  case UPDATE_LANDING_PAGE_MODULES: {
    let newState = Map();
    action.modules.forEach((module) => {
      newState = newState.set(module.id, fromJS(module));
    });
    return newState;
  }
  case UPDATE_LANDING_PAGE_MODULE_TITLE:
    return state
      .updateIn([action.id, 'titleEntries'], updateInLangstringEntries(action.locale, action.value))
      .setIn([action.id, '_hasChanged'], true);
  case UPDATE_LANDING_PAGE_MODULE_SUBTITLE:
    return state
      .updateIn([action.id, 'subtitleEntries'], updateInLangstringEntries(action.locale, action.value))
      .setIn([action.id, '_hasChanged'], true);
  default:
    return state;
  }
};

export type LandingPageState = {
  enabledModulesInOrder: EnabledModulesInOrderState,
  modulesById: Map<string>,
  modulesHasChanged: boolean
};

const reducers = {
  modulesInOrder: modulesInOrder,
  enabledModulesInOrder: enabledModulesInOrder,
  modulesHasChanged: modulesHasChanged,
  modulesById: modulesById
};

export default combineReducers(reducers);