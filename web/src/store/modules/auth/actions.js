import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT,
} from './actionTypes';

export function signInRequest(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { name, email, password },
  };
}

export function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    payload: { user },
  };
}

export function signFailure() {
  return { type: SIGN_FAIL };
}

export function signOut() {
  return { type: SIGN_OUT };
}
