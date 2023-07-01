import { observable, reaction } from 'mobx'

export class RootStore {
  @observable selectorHeight? = 1
}

export const store = new RootStore()

setTimeout(() => {
  console.log('set A')
  store.selectorHeight = 5
}, 3000)

reaction(
  () => store.selectorHeight,
  () => {
    console.log('8888844, change')
  },
)
