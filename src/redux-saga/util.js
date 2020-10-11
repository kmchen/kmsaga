export const is = {
  isPromise(p) {
    return (
      p !== undefined &&
      typeof p.then === "function" &&
      typeof p.catch === "function"
    );
  },
  isEffect(effect) {
    return effect !== undefined && !!effect.isEffect;
  }
};
