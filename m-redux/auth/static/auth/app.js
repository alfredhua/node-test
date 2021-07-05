import React,{lazy,Suspense} from "react";
import { Route,withRouter } from "react-router-dom";
const RoleEdit = withRouter(lazy(() => import("./view/RoleEdit")));
const RoleList = withRouter(lazy(() => import("./view/RoleList")));
const Home = withRouter(lazy(() => import("./view/Home")));
const AdminList = withRouter(lazy(() => import("./view/AdminList")));

export default  class App extends React.Component {

  render() {
    return (
      <div>
         <Suspense fallback={<div>loading...</div>}>
              <Route exect path="/home"  component={Home} /> 
              <Route exect path="/auth/list-admin" component={AdminList} />
              <Route exect path="/auth/edit-role"  component={RoleEdit} /> 
              <Route exect path="/auth/list-role"  component={RoleList} />  
          </Suspense>
       </div>
    );
  }
}