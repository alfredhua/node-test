import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import  auth from 'auth/static/auth/reducerIndex'
import login from '../reducerIndex';
import router from 'common/static/components/router/reduce';
let reducer=combineReducers({
    auth,
    login,
    router
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