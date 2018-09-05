import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRepo, defaultValue } from 'app/shared/model/repo.model';

export const ACTION_TYPES = {
  SEARCH_REPOS: 'repo/SEARCH_REPOS',
  FETCH_REPO_LIST: 'repo/FETCH_REPO_LIST',
  FETCH_REPO: 'repo/FETCH_REPO',
  CREATE_REPO: 'repo/CREATE_REPO',
  UPDATE_REPO: 'repo/UPDATE_REPO',
  DELETE_REPO: 'repo/DELETE_REPO',
  RESET: 'repo/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRepo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RepoState = Readonly<typeof initialState>;

// Reducer

export default (state: RepoState = initialState, action): RepoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_REPOS):
    case REQUEST(ACTION_TYPES.FETCH_REPO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REPO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REPO):
    case REQUEST(ACTION_TYPES.UPDATE_REPO):
    case REQUEST(ACTION_TYPES.DELETE_REPO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_REPOS):
    case FAILURE(ACTION_TYPES.FETCH_REPO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REPO):
    case FAILURE(ACTION_TYPES.CREATE_REPO):
    case FAILURE(ACTION_TYPES.UPDATE_REPO):
    case FAILURE(ACTION_TYPES.DELETE_REPO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_REPOS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REPO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REPO):
    case SUCCESS(ACTION_TYPES.UPDATE_REPO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REPO):
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

const apiUrl = 'api/repos';
const apiSearchUrl = 'api/_search/repos';

// Actions

export const getSearchEntities: ICrudSearchAction<IRepo> = query => ({
  type: ACTION_TYPES.SEARCH_REPOS,
  payload: axios.get<IRepo>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IRepo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REPO_LIST,
  payload: axios.get<IRepo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRepo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REPO,
    payload: axios.get<IRepo>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRepo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REPO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRepo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REPO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRepo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REPO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
