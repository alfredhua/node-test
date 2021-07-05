import React from 'react'
import { connect } from 'react-redux';
import { Card,Form,Breadcrumb,message} from 'antd';
import { get_admin_by_id,save_admin,close } from '../action';
import { Link } from 'react-router-dom'
import AdminEditForm from './AdminEditForm';
class AdminEdit extends React.Component{

  componentDidMount(){
    const {id}=this.props.match.params;
    this.props.load_data(id);
  }

  componentDidUpdate(){
    const {e_admin}= this.props;
     if(e_admin.result_visible){
       this.modal_info(e_admin);
     }
  }

  modal_info(admin){
    var {history}=this.props;
     if(admin.code=='SUCCESS'){
       message.success("保存成功",1,()=>{this.props.close();history.push(`/auth/list-admin`)});
     }else{
       message.success("保存失败!"+admin.msg);
     }
  }

  render(){
     return(
      <div>
       <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>权限管理</Breadcrumb.Item>
          <Breadcrumb.Item> <Link to="/auth/list-admin">管理员列表</Link></Breadcrumb.Item>
          <Breadcrumb.Item>管理员编辑</Breadcrumb.Item>
       </Breadcrumb>
       <Card>
          <AdminEditForm {...this.props.e_admin.admin} role_list={this.props.e_admin.role_list} click={(values)=>{this.props.save(values)}} /> 
       </Card>     
      </div>
      );
    }
}

const mapStateToProps = (store) =>{
    const {auth}=store;
    return auth
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_data:(id)=>{dispatch(get_admin_by_id(id))},
    save:(values)=>{dispatch(save_admin(values))},
    close:()=>{dispatch(close())},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create({})(AdminEdit))