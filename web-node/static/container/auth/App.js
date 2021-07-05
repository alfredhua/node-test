import React from 'react';
import { Route,BrowserRouter,Switch } from 'react-router-dom';
import AdminEdit from './AdminEdit';
import AdminList from './AdminList';
import Home from './Home';
import RoleList from './RoleList';
import RoleCreate from './RoleCreate';
import RoleEdit from './RoleEdit';

export default class App extends React.Component{

    render(){
        return (
                        <BrowserRouter>
                            <Switch>
                                <Route exact path='/home' component={Home} /> 
                                <Route exact path='/auth/adminCreate' component={AdminEdit} />
                                <Route exact path="/auth/edit/:id" component={AdminEdit} />
                                <Route exact path='/auth/adminList' component={AdminList} />
                                <Route exact path='/auth/roleCreate' component={RoleCreate} />
                                <Route path="/auth/roleEdit/:id" component={RoleEdit} />
                                <Route exact path='/auth/roleList' component={RoleList} />
                            </Switch>
                        </BrowserRouter>
        );
    }

}


