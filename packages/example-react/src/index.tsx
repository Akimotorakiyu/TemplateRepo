import './style.css'
// import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { render } from 'react-dom'
import { App } from './App'
const app = render(<App></App>, document.getElementById('root'))
