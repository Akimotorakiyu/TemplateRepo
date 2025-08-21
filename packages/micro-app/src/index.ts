import { preloadApp, setupApp, startApp, destroyApp } from 'wujie'

const vueConfig = {
  name: 'vue',
  url: 'http://localhost:5173/',
  el: '#app',
  alive: true,
}

const reactConfig = {
  name: 'react',
  url: 'http://localhost:5174/',
  el: '#app',
  alive: true,
}

setupApp(vueConfig)
setupApp(reactConfig)

preloadApp(vueConfig)
preloadApp(reactConfig)

let switchAppStatus = true

const switchApp = () => {
  if (switchAppStatus) {
    destroyApp('react')

    startApp(vueConfig)
    switchAppStatus = false
  } else {
    destroyApp('vue')
    startApp(reactConfig)
    switchAppStatus = true
  }
}

setInterval(() => {
  switchApp()
}, 3000)
