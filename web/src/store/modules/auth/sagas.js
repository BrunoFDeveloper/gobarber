import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { SIGN_IN_REQUEST, SIGN_UP_REQUEST, SIGN_OUT } from './actionTypes';
import { signFailure, signInSuccess, signUpSuccess } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é um prestador');
      return;
    }

    yield put(signInSuccess(token, user));
    api.defaults.headers.Authorization = `Bearer ${token}`;

    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na authenticacao');
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    const response = yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    const { data } = response;
    history.push('/');

    yield put(signUpSuccess(data));
  } catch (error) {
    toast.error('Erro ao cadastrar usuário!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(SIGN_IN_REQUEST, signIn),
  takeLatest(SIGN_UP_REQUEST, signUp),
  takeLatest(SIGN_OUT, signOut),
]);
