import { all, put, takeLatest, call } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileFailure, updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.formData;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(response.data));
    Alert.alert('Sucesso!', 'Perfil Atualizado com sucesso!');
  } catch (err) {
    Alert.alert('Falha!', 'Errou ao atualizar o perfil, confira seus dados!');
    yield put(updateProfileFailure);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
