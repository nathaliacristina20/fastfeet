import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { deliverymanId } = payload;
        const { data } = yield call(api.get, `deliverymans/${deliverymanId}`);
        yield put(signInSuccess(data));
    } catch (err) {

        yield put(signInFailure());

        if (err.response && err.response.status === 400) {
            Alert.alert('Falha', err.response.data.error);
        } else {
             Alert.alert('Falha', `Ocorreu um erro inesperado.`);
        }       
    }
}

export function signOut() {}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
