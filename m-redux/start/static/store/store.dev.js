import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import  auth from 'auth/static/auth/reducers'

let reducer=combineReducers({
    auth,
})

let configureStore = preloadedState => {
    const store =createStore(
        reducer,
        preloadedState,
        compose(
            applyMiddleware(thunk)
        )
    );
   return store;
}
 module.exports = configureStore;