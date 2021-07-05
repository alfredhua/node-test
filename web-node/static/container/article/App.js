import React from 'react';
import { Route,BrowserRouter,Switch } from 'react-router-dom';
import ArticleList from './ArticleList';
import ArticleCreate from './ArticleCreate';


export default class App extends React.Component{
    render(){
        return (
            <div>
                    <BrowserRouter>
                        <Switch>
                         <Route exact path='/article/articleList'  component={ArticleList}/>
                         <Route exact path='/article/articleCreate'  component={ArticleCreate}/>
                        </Switch>
                    </BrowserRouter>
             </div>
        );
    }
}
