import React from "react";
import {post} from '../api';
import TextField from '@material-ui/core/TextField';
import TreeItem from '../common/tree/TreeItem';
import Css from './css/Css';
import Button from '@material-ui/core/Button';
import {go_back,go} from '../common/Go';
import Navigation from '../common/naviagte/Navigation';

export default class RoleCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:{},
      dealing:false
    };
  }

  componentWillMount(){
    this.do_axios();
  }

  async do_axios(){
    const result=await post("/auth/getCirculateRole",{});
    this.setState({data:result});
  }

  handle_change_page = (event, page) => {
    this.do_axios(page, this.state.pageSize);
  };

  handle_change_page_size = event => {
    this.do_axios(this.state.page, event.target.value);
  };

  get_role_list=(role_list)=>{
    this.setState({role_list});
  }

  async save_role(){
    const {name,comment,role_list}=this.state;
    this.setState({dealing:true});
    let keys=[];
    role_list&&role_list.map((item)=>{
      keys.push(item.key);
    });
    const {isok,error}=await post("/auth/saveRole",{name,comment,keys});
    if(isok){
      alert("保存成功!");
      this.setState({dealing:true});
      go('/auth/roleList');
    }else{
      alert("保存失败!")
    }
  }
  

  render() {
    return (
      <div>
          <Navigation>
              <TextField style={Css.input} label='角色名' placeholder='角色名' multiline margin='normal'  onChange={(e)=>{this.setState({name:e.target.value})}} />
              <TextField style={Css.input} label='备注' placeholder='备注' multiline margin='normal'   onChange={(e)=>{this.setState({comment:e.target.value})}} />
              <TreeItem data={this.state.data} style={{width:"100%",height:"auto",position: "relative",zoom:1}} 
              on_select={(role_list)=>{this.get_role_list(role_list)}}></TreeItem>
          <div style={{position:"relative",marginLeft:"200px",marginTop:"30px"}}>
              <Button variant="contained" color="primary" onClick={this.save_role.bind(this)}  disabled={this.state.dealing}>保存</Button>
              <Button style={{ marginLeft: "50px"}} variant="contained" color="primary" onClick={() => {go_back()}}>返回</Button>
           </div>
           </Navigation>
      </div>
    );
  }
}

