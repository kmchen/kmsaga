import { take, put, fork } from "./redux-saga";

function* aPlusOneSaga() {
  while (true) {
    yield take("A_PLUS_ONE_SAGA");
    yield put({ type: "A_PLUS_ONE" });
  }
}

function* bPlusOneSaga() {
  while (true) {
    yield take("B_PLUS_ONE_SAGA");
    yield put({ type: "B_PLUS_ONE" });
  }
}

function* rootSaga() {
  yield fork(aPlusOneSaga);
  yield fork(bPlusOneSaga);
}

export default rootSaga;

