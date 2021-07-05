import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from 'common/static/components/router/AuthRoute';
import  website_routers from './website/app';
class Main extends React.Component{
   render(){
    return(
        <BrowserRouter>
            <Switch>
                <Route  path="/website" render={props => <AuthRoute _props={props} routers={website_routers}/>}  />
            </Switch> 
       </BrowserRouter>
      )
   }
}

ReactDOM.render(<Main/>,document.getElementById('app'));