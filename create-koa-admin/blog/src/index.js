import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import {blog_routers} from './app';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from "@common/router/AuthRoute";

class Main extends React.Component{
    render(){
        return(
          <Suspense fallback={<div>loading...</div>}>
            <BrowserRouter>
              <Switch>
                   <Route path="/blog" component={props => <AuthRoute _props={props} routers={blog_routers}/>}  />
               </Switch> 
          </BrowserRouter>
        </Suspense> 
        );
    }
}
ReactDOM.render(<Main/>,document.getElementById('root'));
// serviceWorker.unregister();
