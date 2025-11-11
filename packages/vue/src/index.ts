import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')


const worker = new Worker(new URL('./worker.ts', import.meta.url))