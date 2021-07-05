import React from 'react'
import { connect } from 'react-redux';
import { list_role } from '../action';
import { Breadcrumb,Card } from 'antd';
import DefaultTable from 'common/static/components/table/DefaultTable';
import AuthButton from 'common/static/components/auth/AuthButton';
import { Link } from 'react-router-dom'
import moment  from 'moment';

class RoleList extends React.Component{
   
  componentDidMount(){
    this.props.load_data(this.props.l_role.page_num,this.props.l_role.page_size);
  }

  async page_to(pageInfo){
    const { current,pageSize }=pageInfo;
    this.props.load_data(current,pageSize)
  }

  render(){
      const columns = [{
        title: 'ID号',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
      }, {
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
            <AuthButton auth_type="tag" path={'/auth/role/edit'} onClick={()=>{this.props.history.push(`/auth/edit-role/${data.id}`)}}>编辑</AuthButton>
          </div>
        )
      }];
      const {l_role}=this.props;
      return(
        <div>
         <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>权限管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/auth/list-role">角色列表</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Card>
              <AuthButton auth_type="button" path={'/auth/role/create'} onClick={()=>{this.props.history.push(`/auth/create-role`)}}>创建</AuthButton>
              <DefaultTable  columns={columns}  data={l_role} onChange={(pageInfo) => { this.page_to(pageInfo) }} />  
          </Card>
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  return  store.auth
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_data:(page_num,page_size)=>{dispatch(list_role(page_num,page_size))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoleList)