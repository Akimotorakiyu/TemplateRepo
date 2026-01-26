import { sayHello } from './hello'

console.log('globalThis in worker', globalThis)

import { expose } from 'comlink'

expose({
  sayHello,
})
