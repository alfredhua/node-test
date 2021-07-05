import React from 'react'
import { Tree,Breadcrumb,Card,Button,message } from 'antd';
import LongInput from 'common/static/components/input/LongInput';
import { Link } from 'react-router-dom'
const { TreeNode } = Tree;
import {post} from 'common/static/util/request';

export default class RoleEdit extends React.Component{
   
  constructor(props){
    super(props);
    this.state={
      info:{
        name:null,
        comment:null,
        auth_list:[],
      },
      authority_list:[]
    }
  }
 


  componentDidMount(){
    const {id}=this.props.match.params;
    this.load_data(id);
  }

  async load_data(id){
    let info=this.state;
    if(id){
       info = await post("/auth/get-role-by-id",{id});
      if(info&&info.code==='SUCCESS'){
        info=info.data;
        info.auth_list=JSON.parse(info.auth_list);
      }
    }
    const authority_result = await post("/auth/authority-list",{});
    this.setState({info,authority_list:authority_result.data})
  }

  onCheck = checked_keys => {
    this.change('auth_list',checked_keys);
  };

  change(item,value){
    let {info}=this.state;
    info[item]=value;
    this.setState({info});
  }

  async save(){
    const {id,name,comment,auth_list}=this.state.info;
    if(!name&&name.trim()==''){
      message.error("角色名称不能为空");
      return;
    }
    if(!auth_list){
      message.error("权限不能为空!");
      return;
    }
    let result;
    if(id){
      result=await post("/auth/update-role",{id,name,comment,auth_list});
    }else{
        result=await post("/auth/create-role",{name,comment,auth_list});
    }
    if(result&&result.code === 'SUCCESS' ){
      message.success("保存成功",1,()=>{this.props.history.push(`/auth/list-role`)});
    }else{
      message.success("保存失败!"+role.msg);
    }
  };

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
      const {info}=this.state;
      return(
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/auth/list-role">角色列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item>角色编辑</Breadcrumb.Item>
          </Breadcrumb>
          
          <Card>

              <LongInput placeholder="角色名称" label="角色名称" value={info.name} onChange={(e)=>{this.change('name',e.target.value)}}/>

              <LongInput placeholder="备注" label="备注" value={info.comment} onChange={(e)=>{this.change('comment',e.target.value)}}/>

              <Tree
                  checkable 
                  onCheck={this.onCheck}
                  checkedKeys={info.auth_list}
                  style={{marginLeft:200,marginTop:5}} >
                 {this.renderTreeNodes(this.state.authority_list)}
              </Tree>

              <Button style={{marginLeft:200,marginTop:5}} type="primary" size="small" onClick={()=>{this.save()}} >保存</Button>
              
          </Card>
        </div>
      )
    }
}