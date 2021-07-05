import React from 'react'
import { connect } from 'react-redux';
import { get_role_by_id,save_role,close,change }  from '../action';
import { Tree,Breadcrumb,Card,Button,message } from 'antd';
import LongInput from 'common/static/components/input/LongInput';
import { Link } from 'react-router-dom'
const { TreeNode } = Tree;

class RoleEdit extends React.Component{
   

  componentDidMount(){
    const {id}=this.props.match.params;
    this.props.load_data(id);
  }

  onCheck = checked_keys => {
    this.props.change('auth_list',checked_keys);
  };

  save=()=>{
    const {id,name,comment,auth_list}=this.props.e_role.info;
    if(!name&&name.trim()==''){
      message.error("角色名称不能为空");
      return;
    }
    if(!auth_list){
      message.error("权限不能为空!");
      return;
    }
    this.props.save(id,name,comment,auth_list);
  };

  componentDidUpdate(){
   const {e_role}= this.props;
    // if(e_role.result_visible){
    //   this.props.close(e_role);
    // }
  }

  //  modal_info(role){
  //   var {history}=this.props;
  //    if(role.code=='SUCCESS'){
  //      message.success("保存成功",1,()=>{props.close();history.push(`/auth/list-role`)});
  //    }else{
  //      message.success("保存失败!"+role.msg);
  //    }
  //  }

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
      const {info}=this.props.e_role;
      console.log(this.props.e_role,"--------");
      console.log(this.props,"-----2222---");

      return(
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/auth/list-role">角色列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item>角色编辑</Breadcrumb.Item>
          </Breadcrumb>
          
          <Card>

              <LongInput placeholder="角色名称" label="角色名称" value={info.name} onChange={(e)=>{this.props.change('name',e.target.value)}}/>

              <LongInput placeholder="备注" label="备注" value={info.comment} onChange={(e)=>{this.props.change('comment',e.target.value)}}/>

              <Tree
                  checkable 
                  onCheck={this.onCheck}
                  checkedKeys={info.auth_list}
                  style={{marginLeft:200,marginTop:5}} >
                 {this.renderTreeNodes(this.props.e_role.authority_list)}
              </Tree>

              <Button style={{marginLeft:200,marginTop:5}} type="primary" size="small" onClick={this.save} >保存</Button>
              
          </Card>
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  return{e_role:store.auth.e_role}
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_data:(id)=>{dispatch(get_role_by_id(id))},
    save:(id,name,comment,auth_list)=>{dispatch(save_role(id,name,comment,auth_list))},
    close:()=>{dispatch(close())},
    change:(item,value)=>{dispatch(change(item,value))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RoleEdit)