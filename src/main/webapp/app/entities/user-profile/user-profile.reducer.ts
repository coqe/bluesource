import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserProfile, defaultValue } from 'app/shared/model/user-profile.model';

export const ACTION_TYPES = {
  SEARCH_USERPROFILES: 'userProfile/SEARCH_USERPROFILES',
  FETCH_USERPROFILE_LIST: 'userProfile/FETCH_USERPROFILE_LIST',
  FETCH_USERPROFILE: 'userProfile/FETCH_USERPROFILE',
  CREATE_USERPROFILE: 'userProfile/CREATE_USERPROFILE',
  UPDATE_USERPROFILE: 'userProfile/UPDATE_USERPROFILE',
  DELETE_USERPROFILE: 'userProfile/DELETE_USERPROFILE',
  SET_BLOB: 'userProfile/SET_BLOB',
  RESET: 'userProfile/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserProfile>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserProfileState = Readonly<typeof initialState>;

// Reducer

export default (state: UserProfileState = initialState, action): UserProfileState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_USERPROFILES):
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERPROFILE):
    case REQUEST(ACTION_TYPES.UPDATE_USERPROFILE):
    case REQUEST(ACTION_TYPES.DELETE_USERPROFILE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_USERPROFILES):
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERPROFILE):
    case FAILURE(ACTION_TYPES.CREATE_USERPROFILE):
    case FAILURE(ACTION_TYPES.UPDATE_USERPROFILE):
    case FAILURE(ACTION_TYPES.DELETE_USERPROFILE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_USERPROFILES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERPROFILE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERPROFILE):
    case SUCCESS(ACTION_TYPES.UPDATE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERPROFILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/user-profiles';
const apiSearchUrl = 'api/_search/user-profiles';

// Actions

export const getSearchEntities: ICrudSearchAction<IUserProfile> = query => ({
  type: ACTION_TYPES.SEARCH_USERPROFILES,
  payload: axios.get<IUserProfile>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IUserProfile> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERPROFILE_LIST,
  payload: axios.get<IUserProfile>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserProfile> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERPROFILE,
    payload: axios.get<IUserProfile>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERPROFILE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserProfile> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERPROFILE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserProfile> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERPROFILE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});