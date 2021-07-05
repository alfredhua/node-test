import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from "@common/router/AuthRoute";
import { website_routers } from './app';

class Main extends React.Component{
    render(){
        return(
          <Suspense fallback={<div>loading...</div>}>
            <BrowserRouter >
              <Switch>
                 <Route path="/website" component={props => <AuthRoute _props={props} routers={website_routers}/>}  />
               </Switch> 
            </BrowserRouter>
        </Suspense> 
        );
    }
}
ReactDOM.render(<Main/>,document.getElementById('root'));
// serviceWorker.unregister();
