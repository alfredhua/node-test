import React,{Suspense} from "react";
import { Route,Redirect } from "react-router-dom";
import Navigate from 'common/static/components/navigate/Navigate';
import { connect } from 'react-redux';
import {load_data} from './action';
import Error403 from '../error/Error403';
import {withRouter} from 'react-router-dom';
import {isok} from '../../util/Auth';
class AuthRoute extends React.Component {

  componentDidMount(){
    this.props.load_data();
  }

  render(){
    console.log(this.props);
    return(
      <Navigate user_auth_list={this.props.auth_router.user_auth_list}>
          <Suspense fallback={<div>loading...</div>}>
           {this.props.routers.map((item,index)=>{
                return(
                  <Route key={index} path={item.path}
                     render ={()=>{ 
                       if(!item.auth){
                        if(!isok(this.props.auth_router.user_auth_list,item.auth_path)){
                          <Redirect to={{ pathname: "/403"}}/>
                          return <Error403/>
                        }else{
                          return <item.component auth_list={this.props.auth_list} />
                        }
                       }else{
                          return <item.component auth_list={this.props.auth_list} />
                       }
                      
                    }}
                   />
                );
            })} 
        </Suspense>
     </Navigate>
    );
  }
}

const mapStateToProps = (store) =>{
  return store.router;
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_data:()=>{dispatch(load_data())},
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));