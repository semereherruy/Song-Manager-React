import { all } from 'redux-saga/effects';
import songsSaga from './songsSaga.js';

export default function* rootSaga() {
  yield all([
    songsSaga(),
  ]);
} 