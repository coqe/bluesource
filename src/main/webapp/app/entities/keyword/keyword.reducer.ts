import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IKeyword, defaultValue } from 'app/shared/model/keyword.model';

export const ACTION_TYPES = {
  SEARCH_KEYWORDS: 'keyword/SEARCH_KEYWORDS',
  FETCH_KEYWORD_LIST: 'keyword/FETCH_KEYWORD_LIST',
  FETCH_KEYWORD: 'keyword/FETCH_KEYWORD',
  CREATE_KEYWORD: 'keyword/CREATE_KEYWORD',
  UPDATE_KEYWORD: 'keyword/UPDATE_KEYWORD',
  DELETE_KEYWORD: 'keyword/DELETE_KEYWORD',
  RESET: 'keyword/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IKeyword>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type KeywordState = Readonly<typeof initialState>;

// Reducer

export default (state: KeywordState = initialState, action): KeywordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_KEYWORDS):
    case REQUEST(ACTION_TYPES.FETCH_KEYWORD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_KEYWORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_KEYWORD):
    case REQUEST(ACTION_TYPES.UPDATE_KEYWORD):
    case REQUEST(ACTION_TYPES.DELETE_KEYWORD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_KEYWORDS):
    case FAILURE(ACTION_TYPES.FETCH_KEYWORD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_KEYWORD):
    case FAILURE(ACTION_TYPES.CREATE_KEYWORD):
    case FAILURE(ACTION_TYPES.UPDATE_KEYWORD):
    case FAILURE(ACTION_TYPES.DELETE_KEYWORD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_KEYWORDS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYWORD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_KEYWORD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_KEYWORD):
    case SUCCESS(ACTION_TYPES.UPDATE_KEYWORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_KEYWORD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/keywords';
const apiSearchUrl = 'api/_search/keywords';

// Actions

export const getSearchEntities: ICrudSearchAction<IKeyword> = query => ({
  type: ACTION_TYPES.SEARCH_KEYWORDS,
  payload: axios.get<IKeyword>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IKeyword> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_KEYWORD_LIST,
  payload: axios.get<IKeyword>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IKeyword> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_KEYWORD,
    payload: axios.get<IKeyword>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IKeyword> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_KEYWORD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IKeyword> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_KEYWORD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IKeyword> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_KEYWORD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
