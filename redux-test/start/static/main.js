import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from 'common/static/components/router/AuthRoute';
import  auth_routers from 'auth/static/auth/app';
import {post} from 'common/static/util/request';
import Login from './login/view/Login';

const store = configureStore();


class Main extends React.Component{

   render(){
    return(
        <Provider store={store}>
            <BrowserRouter>
               <Switch>
                 <Route exact path="/" onChange={()=>{this.loadData()}}  component={props =><Login _props={props}/>} />
                  <Route  path="/auth" render={props => <AuthRoute routers={auth_routers}/>}  />

                 <Route exact path="/403" component={props => <div>403</div>} />
               </Switch> 
            </BrowserRouter>
         </Provider>
      )
   }
}

ReactDOM.render(<Main/>,document.getElementById('app'));