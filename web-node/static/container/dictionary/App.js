import React from 'react';
import { Route,BrowserRouter,Switch } from 'react-router-dom';
import AuthDictionaryList from './AuthDictionaryList';

export default class App extends React.Component{
    render(){
        return (
            <div>
                    <BrowserRouter>
                        <Switch>
                         <Route exact path='/dictionary/authDictionaryList'  component={AuthDictionaryList}/>
                        </Switch>
                    </BrowserRouter>
             </div>
        );
    }
}
