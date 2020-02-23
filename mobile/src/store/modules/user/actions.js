import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from './actionTypes';

export function updateProfileRequest(data) {
  return { type: UPDATE_PROFILE_REQUEST, payload: { data } };
}

export function updateProfileSuccess(data) {
  return { type: UPDATE_PROFILE_SUCCESS, payload: { data } };
}

export function updateProfileFailure() {
  return { type: UPDATE_PROFILE_FAIL };
}
