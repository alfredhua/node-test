import React from 'react'
import { Card,Breadcrumb } from 'antd'
import { list_admin } from '../action';
import { connect } from 'react-redux';
import DefaultTable from 'common/static/components/table/DefaultTable';
import AuthButton from 'common/static/components/auth/AuthButton';
import { Link } from 'react-router-dom'
import moment  from 'moment';


class AdminList extends React.Component{
   
    componentDidMount(){
      this.props.load_data(1,10);
    }

    async page_to(pageInfo){
      const { current,pageSize }=pageInfo;
      this.props.load_data(current,pageSize)
    }

    render(){
      const columns = [{
        title: '名称',
        dataIndex: 'id',
        key: 'id',
      },{
        title: '用户名',
        dataIndex: 'user_name',
        key: 'user_name',
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },{
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(create_time)=>{
          return(<div>{moment(create_time).format('YYYY-MM-DD HH:mm:ss')}</div>)
        }
      },{
        title: '操作',
        key: 'action',
        align: 'center',
        render: (data) => (
          <div>
            <AuthButton auth_type="tag" path={'/auth/admin/edit'} onClick={()=>{this.props.history.push(`/auth/edit-admin/${data.id}`)}}>编辑</AuthButton>
          </div>
        )
      }];
      const {l_admin}=this.props;
      return(
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>权限管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/auth/list-admin">管理员列表</Link></Breadcrumb.Item>
          </Breadcrumb>

          <Card>
             <AuthButton auth_type="button" path={'/auth/admin/create'} onClick={()=>{this.props.history.push(`/auth/create-admin`)}}>创建</AuthButton>
             <DefaultTable  columns={columns}  data={l_admin} onChange={(pageInfo) => { this.page_to(pageInfo) }} />  
          </Card>
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  const {auth}=store;
  return auth
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_data:(page_num,page_size)=>{dispatch(list_admin(page_num,page_size))},
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AdminList)