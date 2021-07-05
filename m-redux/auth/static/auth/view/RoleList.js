import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';

class RoleList extends React.Component{
   
  componentDidMount(){
  }

  load_data(){
    // this.props.dispatch(list_admin(page,pageSize));
  }
    
    render(){
      return(
        <div>
           roleList
           <Button type="primary" onClick={()=>{this.props.history.push(`/auth/edit-role`)}}>创建</Button>
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  console.log(store);
  const {role}=store;
  return  {...role}
}

export default connect(mapStateToProps)(RoleList)