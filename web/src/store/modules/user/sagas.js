import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_REQUEST } from './actionTypes';
import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({
  payload: {
    data: { name, email, avatar_id, ...rest },
  },
}) {
  const profile = { name, email, avatar_id, ...(rest.oldPassword ? rest : {}) };

  try {
    const response = yield call(api.put, 'user', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(UPDATE_PROFILE_REQUEST, updateProfile)]);
