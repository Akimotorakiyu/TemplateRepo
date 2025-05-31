import { preloadApp, setupApp, startApp } from 'wujie'

const vueConfig = {
  name: 'vue',
  url: 'http://localhost:5173/',
  el: '#app',
}

const reactConfig = {
  name: 'vue',
  url: 'http://localhost:5174/',
  el: '#app',
}

setupApp(vueConfig)
setupApp(reactConfig)

preloadApp(vueConfig)
preloadApp(reactConfig)

startApp(vueConfig)
