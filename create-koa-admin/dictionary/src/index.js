import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import { dictionary_routers } from './app';
import { BrowserRouter,Route,Switch } from "react-router-dom";
import AuthRoute from "@common/router/AuthRoute";

class Main extends React.Component{
    render(){
        return(
          <Suspense fallback={<div>loading...</div>}>
            <BrowserRouter>
              <Switch>
                   <Route path="/dictionary" component={props => <AuthRoute _props={props} routers={dictionary_routers}/>}  />
               </Switch> 
          </BrowserRouter>
        </Suspense> 
        );
    }
}
ReactDOM.render(<Main/>,document.getElementById('root'));
// serviceWorker.unregister();
