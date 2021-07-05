import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import { BrowserRouter,Route } from "react-router-dom";
import Navigate from 'common/static/components/navigate/Navigate';
import AuthApp from 'auth/static/auth/app';
import WebsiteApp from 'website/static/website/app';


const store = configureStore();

class Children extends React.Component{
   render(){
      return(
         <div>
            <AuthApp/>
            <WebsiteApp/>
       </div>
      )
   }
}

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
          <Route path="/" render={(popos)=>{ return <Navigate children={<Children/>}/>}}/>
     </BrowserRouter>
  </Provider>,
   document.getElementById('app')
);