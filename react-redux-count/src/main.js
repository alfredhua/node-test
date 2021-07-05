import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import configureStore from './store/configureStore'
import { BrowserRouter as Router } from 'react-router-dom'
const store = configureStore()

render(
  <Router>
     <App store={store} />
  </Router>,
  document.getElementById('app')
)
