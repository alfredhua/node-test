import React from "react";
import {post} from '../api';
import TextField from '@material-ui/core/TextField';
import TreeItem from 'common-admin/src/tree/TreeItem';
import Css from './css/Css';
import Button from '@material-ui/core/Button';
import {go_back,go} from 'common-admin/src/Go';

export default class RoleEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      dealing:false,
      all_checked_node:[],
      checked:[],
      role:{name:"",comment:"",auth_list:""}
    };
  }

  componentWillMount(){
    this.do_axios();
  }

  async do_axios(){
    const result=await post("/auth/getCirculateRole",{});
    const {id}=this.props.match.params;
    let {checked,all_checked_node}=this.state;
    const {role,list}=await post("/auth/getRoleAndAuthDictionaryList",{id});
    const {auth_list}=role;
    JSON.parse(auth_list).map((item)=>{
      checked[item]=true;
    });
    list&&list.map((item)=>{
      all_checked_node.push({key:item.id,title:item.value,href:item.href})
    })
    this.setState({data:result,role,all_checked_node});
  }

  handle_change_page = (event, page) => {
    this.do_axios(page, this.state.pageSize);
  };

  handle_change_page_size = event => {
    this.do_axios(this.state.page, event.target.value);
  };

  get_role_list=(auth_list)=>{
    this.setState({auth_list});
  }

  async update_role(){
    const {role,auth_list}=this.state;
    this.setState({dealing:true});
    let keys=[];
    auth_list&&auth_list.map((item)=>{
      keys.push(item.key);
    })
    role.auth_list=JSON.stringify(keys);
    const {isok,error}=await post("/auth/updateRole",{role});
    if(isok){
      alert("保存成功!");
      this.setState({dealing:true});
      go('/auth/roleList');
    }else{
      alert("保存失败!")
    }
  }


  set_current_role= (key, event) => {
    const {role} = this.state;
    role[key] = event.target.value;
    this.setState({ role });
}



  render() {
    const {role}=this.state;
    return (
      <div>
              <TextField style={Css.input} label='角色名' placeholder='角色名'  margin='normal' value={role.name}  onChange={this.set_current_role.bind(this,"name")} />
              <TextField style={Css.input} label='备注' placeholder='备注'  margin='normal'   onChange={this.set_current_role.bind(this,"comment")} value={role.comment}/>
              <TreeItem data={this.state.data} style={{width:"100%",height:"auto",position: "relative",zoom:1}}
              all_checked_node={this.state.all_checked_node} 
              checked={this.state.checked}
              on_select={(auth_list)=>{this.get_role_list(auth_list)}}></TreeItem>
          <div style={{position:"relative",marginLeft:"200px",marginTop:"30px"}}>
              <Button variant="contained" color="primary" onClick={this.update_role.bind(this)}  disabled={this.state.dealing} >保存</Button>
              <Button style={{ marginLeft: "50px"}} variant="contained" color="primary" onClick={() => {go_back()}}>返回</Button>
           </div>
      </div>
    );
  }
}

