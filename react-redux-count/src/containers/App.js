import React from "react";
import AdminList from "./admin/AdminList";
import AdminDetail from "./admin/AdminDetail";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from "react-router-dom";

class App extends React.Component{
  render(){
    return(
      <Provider store={this.props.store}>
         <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AdminList}/>
                <Route exact path="/detail" component={AdminDetail}/>
            </Switch>
         </BrowserRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
