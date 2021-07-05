import React from 'react'
import { Card,Table } from 'antd'
import { list_admin } from '../actions/admin';
import { connect } from 'react-redux';

class AdminList extends React.Component{
   
    constructor(props){
      super(props);
      this.state={
        page:1,
        pageSize:10
      }
    }

    componentDidMount(){
      const {page,pageSize}=this.setState;
      this.load_data(page,pageSize);
    }

    load_data(page,pageSize){
      this.props.dispatch(list_admin(page,pageSize));
    }
    
    render(){
      const columns = [{
        title: '姓名',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      }];
      const {admin}=this.props;
      return(
        <div>
            <Table dataSource={admin.list} columns={columns} /> 
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  const {auth}=store;
  return  {...auth}
}

export default connect(mapStateToProps)(AdminList)