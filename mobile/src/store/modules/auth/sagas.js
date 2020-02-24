import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { SIGN_IN_REQUEST, SIGN_UP_REQUEST, SIGN_OUT } from './actionTypes';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

import api from '~/services/api';

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Usuário não pode ser prestador');
      return;
    }

    yield put(signInSuccess(token, user));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // navigation.push('/dashboard');
  } catch (error) {
    Alert.alert('Falha na authenticação');
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    const response = yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    const { data } = response;
    // history.push('/');

    yield put(signUpSuccess(data));
  } catch (error) {
    Alert.alert('Erro ao cadastrar usuário!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(SIGN_IN_REQUEST, signIn),
  takeLatest(SIGN_UP_REQUEST, signUp),
]);
