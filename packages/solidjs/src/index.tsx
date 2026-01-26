import { render } from 'solid-js/web'
import './index.css'
import App from './App'

render(() => <App />, document.getElementById('root')!)

import { proxy, wrap } from 'comlink'

// 只有在 new Worker() 声明中直接使用 new URL() 构造函数时，work 线程的检测才会生效。
// 此外，所有选项参数必须是静态值（即字符串字面量）。
// https://cn.vite.dev/guide/features#web-workers
const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
})

const p = wrap<{
  sayHello: (getName: () => string) => void
}>(worker)

p.sayHello(proxy(() => 'rakiyu'))
