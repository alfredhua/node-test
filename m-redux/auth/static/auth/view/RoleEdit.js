import React from 'react'
import { connect } from 'react-redux';
import { list_authority,save_role,close }  from '../actions/role';
import { Tree,Breadcrumb,Card,Button, Modal, message } from 'antd';
import DefaultBreadcrumb from 'common/static/components/DefaultBreadcrumb';
import LongInput from 'common/static/components/input/LongInput';

const { TreeNode } = Tree;


class RoleEdit extends React.Component{
   
  componentDidMount(){
    this.load_data();
  }

  load_data(){
    this.props.dispatch(list_authority());
  }

  onCheck = checkedKeys => {
    this.setState({ auth_list:checkedKeys });
  };

  save=()=>{
    const {name,comment,auth_list}=this.state;
    const {id}=this.props.role;
    if(!name&&name.trim()==''){
      message.error("角色名称不能为空");
      return;
    }
    if(!auth_list){
      message.error("权限不能为空!");
      return;
    }
    this.props.dispatch(save_role(id,name,comment,auth_list))
  };


  componentDidUpdate(){
   const {role}= this.props;
    if(role.result_visible){
      this.get_modal(role);
    }
  }

  get_modal(role){
   var {dispatch,history}=this.props;
    if(role.code=='SUCCESS'){
      Modal.success({
        title: '保存',
        content: '保存成功',
        onOk() {
          dispatch(close());
          history.push(`/list-role`);
        },
      });
    }else{
      Modal.error({
        title: '保存',
        content: role.msg,
      });
    }
  }


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
    return <TreeNode {...item} />;
  });

    render(){
      return(
        <div>
          <DefaultBreadcrumb>
              <Breadcrumb.Item>权限管理</Breadcrumb.Item>
              <Breadcrumb.Item>角色列表</Breadcrumb.Item>
          </DefaultBreadcrumb>
          
          <Card>
              <LongInput placeholder="角色名称" label="角色名称"  onChange={(e)=>{this.setState({name:e.target.value})}}/>

              <LongInput placeholder="备注" label="备注"  onChange={(e)=>{this.setState({comment:e.target.value})}}/>

              <Tree
                  checkable 
                  onCheck={this.onCheck}
                  style={{marginLeft:200,marginTop:5}} >
                {this.renderTreeNodes(this.props.role.authority_list)}
              </Tree>

              <Button style={{marginLeft:200,marginTop:5}} type="primary" size="small" onClick={this.save} >保存</Button>
              
          </Card>
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  const {auth}=store;
  return {...auth}
}

export default connect(mapStateToProps)(RoleEdit)