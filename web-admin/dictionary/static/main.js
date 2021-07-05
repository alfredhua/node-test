import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from 'common/static/components/router/AuthRoute';
import  dictionary_routers from 'dictionary/static/dictionary/app';
class Main extends React.Component{
   render(){
    return(
        <BrowserRouter>
            <Switch>
                <Route  path="/dictionary" render={props => <AuthRoute _props={props} routers={dictionary_routers}/>}  />
            </Switch> 
       </BrowserRouter>
      )
   }
}

ReactDOM.render(<Main/>,document.getElementById('app'));