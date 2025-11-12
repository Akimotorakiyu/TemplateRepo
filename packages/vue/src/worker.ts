import { sayHello } from './hello'

console.log(this, globalThis)

import { expose } from 'comlink'

expose({
  sayHello,
})
