import {
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_FAIL,
  SIGN_OUT,
} from './actionTypes';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function authReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        signed: true,
        loading: false,
      };

    case SIGN_FAIL:
      return {
        ...state,
        loading: false,
      };

    case SIGN_OUT:
      return {
        ...state,
        token: null,
        signed: false,
      };

    default:
      return state;
  }
}
