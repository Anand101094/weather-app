import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import 'regenerator-runtime/runtime.js'
import store from './redux/store/store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
)
