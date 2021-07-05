import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import authReducers from 'auth/static/auth/reducers'
import weisiteReducers from 'website/src/reducers'
let configureStore = preloadedState => {
    const store = createStore(
      preloadedState,
      authReducers,
      weisiteReducers,
      compose(
        applyMiddleware(thunk),
      )
    )
    return store
}
module.exports = configureStore;
