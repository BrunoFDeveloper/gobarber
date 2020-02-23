import { SIGN_IN_SUCCESS, SIGN_OUT } from '../auth/actionTypes';
import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from './actionTypes';

const INITIAL_STATE = {
  profile: null,
  loading: false,
};

export default function authReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: payload.user,
      };

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload.data,
      };

    case SIGN_OUT:
      return {
        ...state,
        profile: null,
      };

    default:
      return state;
  }
}
