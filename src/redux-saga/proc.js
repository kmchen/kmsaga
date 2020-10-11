import effectRunnerMap from "./effectRunnerMap";
import { is } from "./util";

const { isEffect, isPromise } = is;

export default function(iterator) {
  const store = this;

  next();

  function next(err, pre) {
    let temp;

    if (err) {
      temp = iterator.throw(err);
    } else {
      temp = iterator.next(pre);
    }

    if (temp.done) return;

    const value = temp.value;
    if (isPromise(value)) {
      value.then(success => next(null, success)).catch(error => next(error));
    } else if (isEffect(value)) {
      const effectRunner = effectRunnerMap[value.type];
      effectRunner(value, next, store);
    } else {
      next(null, value);
    }
  }
}
