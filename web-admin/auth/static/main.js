import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch,Redirect } from "react-router-dom";
import AuthRoute from 'common/static/components/router/AuthRoute';
import  auth_routers from './auth/app';
import Login from './auth/login/Login';
import Error403 from 'common/static/components/error/Error403';
import Error404 from 'common/static/components/error/Error404';

class Main extends React.Component{

   render(){
    return(
        <BrowserRouter>
            <Switch>
                <Route  path="/auth/" render={props => <AuthRoute _props={props} routers={auth_routers}/>}  />
                 <Route exact path="/403" render={props => <Error403/>} />
                 <Route exact path="/"  component={props =><Redirect to="/login"/>} />
                     <Route path="/login"  component={props =><Login _props={props}/>} />
                 <Route render={props => <Error404 _props={props}/>} />
            </Switch> 
       </BrowserRouter>
      )
   }
}

ReactDOM.render(<Main/>,document.getElementById('app'));