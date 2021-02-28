import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// style
import './index.css'

// Redux
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
// import App1 from './containers/LoginContainer'
// import App2 from './containers/UserDataContainer'
import rootReducer from './modules/rootReducer'

import { icons } from './assets/icons'

React.icons = icons

const store = createStore(
  rootReducer,
  compose(
    process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
