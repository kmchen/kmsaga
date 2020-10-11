import channel from "./channel";
import proc from "./proc";
import { take, fork } from "./effect";

function runTakeEffect({ pattern }, next) {
  channel.take({
    pattern,
    cb: args => next(null, args)
  });
}

function runCallEffect({ fn, args }, next) {
  fn.call(null, args)
    .then(success => next(null, success))
    .catch(error => next(error));
}

function runPutEffect({ action }, next, store) {
  const { dispatch } = store;
  dispatch(action);
  next();
}

function runForkEffect({ saga }, next, store) {
  const child = saga();
  proc.call(store, child);
  next();
}

function runTakeEveryEffect({ pattern, saga }, next, store) {
  function* takeEvery() {
    while (true) {
      yield take(pattern);
      yield fork(saga);
    }
  }

  runForkEffect({ saga: takeEvery }, next, store);
}

export default {
  take: runTakeEffect,
  call: runCallEffect,
  put: runPutEffect,
  fork: runForkEffect,
  takeEvery: runTakeEveryEffect
};
