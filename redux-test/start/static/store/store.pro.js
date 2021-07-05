import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import  auth from 'auth/static/auth/reducers'
import login from '../reducers/index';

let reducer=combineReducers({
    auth,
    login,

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