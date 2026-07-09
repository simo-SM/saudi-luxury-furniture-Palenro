export class AsyncLocalStorage {
  constructor() {}
  getStore() { return undefined; }
  run(store, callback) { return callback(); }
}
