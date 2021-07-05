import React from 'react';
import { Button,Tag } from 'antd';
import {isok} from '../../util/Auth';
import { connect } from 'react-redux';

class AuthButton extends React.Component{
  
 get_render(auth_type){
   let button=null;
   var _props=Object.assign({},{...this.props});
   _props.dispatch=null;
   switch(auth_type){
     case 'button':
        button= isok(this.props.auth_router.user_auth_list,this.props.path)? <Button type="primary" {..._props} >{this.props.children}</Button> :null
        break;
     case 'tag':
       button= isok(this.props.auth_router.user_auth_list,this.props.path)?<Tag color="#1da57a" {..._props}>{this.props.children}</Tag> :null 
       break;
     default:
        break;
   }
   return button;
 }

  render(){
      return(
        <span >
          {this.get_render(this.props.auth_type)}
        </span>
      )
  }
}

const mapStateToProps = (store) =>{
  return store.router;
}

export default connect(mapStateToProps)(AuthButton)