function channel() {
  let takers = [];

  function take(taker) {
    takers.push(taker);
  }

  function put(pattern, args) {
    if (!takers.length === 0) return;

    for (let i = takers.length - 1; i >= 0; i--) {
      const taker = takers[i];

      if (taker.pattern === pattern) {
        taker.cb.call(null, args);
        takers.splice(i, 1);
      }
    }
  }

  return {
    take,
    put
  };
}

export default channel();
