import { add, wasmBooted } from './lib.rs'

wasmBooted.then(() => {
  console.log('return value was', add(2, 3));
});