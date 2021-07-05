import React from 'react';
import { Route,BrowserRouter,Switch } from 'react-router-dom';
import Login from './Login';


export default class LoginApp extends React.Component{

    render(){
        return (
                 <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Login} /> 
                        <Route exact path='/login' component={Login} /> 
                    </Switch>
                 </BrowserRouter>
        );
    }

}
