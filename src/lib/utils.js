export function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

export const sortBy = curry((fn, xs) => xs.sort((a, b) => {
  if (fn(a) === fn(b)) {
    return 0;
  }

  return fn(a) > fn(b) ? 1 : -1;
}));

export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
export const sortAsc = sortBy(x => x);
export const head = xs => xs[0];
export const last = xs => xs[xs.length - 1];
export const map = curry((fn, arr) => arr.map(fn));
export const product = xs => xs.reduce((a, c) => a * c, 1);
export const sum = xs => xs.reduce((a, c) => a + c, 0);
export const then = curry((f, p) => p.then(f));
export const split = curry((t, s) => s.split(t));
export const replace = curry((r, s) => xs => xs.map(x => x.replace(r, s)));
export const flatten = xs => xs.reduce((a, c) => [...a, ...c]);
export const regex = curry((r, w) => w.match(r));
export const filter = curry((f, xs) => xs.filter(f));

export class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }
}

export const report = x => {
	console.log(x);
	return x;
}
