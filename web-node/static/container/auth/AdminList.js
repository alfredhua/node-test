import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TablePaginationActionsWrapped from '../common/table/TablePaginationActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {go,flush} from '../common/Go';
import {post} from '../api';
import Fade from '@material-ui/core/Fade';
import Navigation from '../common/naviagte/Navigation';

export default class AdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page:0,
      page_size:10,
      total:0,
      list:[],
      phone:"",
      user_name:"",
      anchor_el: null,
      is_active:false
    };
  }

  componentWillMount(){
    this.do_axios(this.state.page,this.state.page_size);
  }
  
  async do_axios(page,page_size){
    const result=await post("/auth/listAdmin",{page,page_size});
    this.setState(result);
  }

  handle_change_page = (event, page) => {
    this.do_axios(page, this.state.page_size);
  };

  handle_change_page_size = event => {
    this.do_axios(this.state.page, event.target.value);
  };
  async search(){
    const {page,page_size,user_name,phone}=this.state;
    const result=await post("/auth/listAdmin",{page,page_size,user_name,phone});
    this.setState(result);
  }

  handle_click(value,event) {
    this.setState({ anchor_el: event.currentTarget,current_admin:value,is_active:value._active});
  };

  handle_close = () => {
    this.setState({ anchor_el: null });
  };


  edit_admin=()=>{
    const {current_admin}=this.state;
    go(`/auth/edit/${current_admin.id}`);
  }

   async  frozen_admin(){
    const {current_admin}=this.state;
    const {isok,error}=await post('/auth/frozenAdmin',{id:current_admin.id,active:false});
    if(isok){
      alert("保存成功!");
    }else{
        alert("保存失败!name:"+error.name+",msg:"+error.msg);
    }
    flush();
  }

  async upfrozen_admin(){
    const {current_admin}=this.state;
    const {isok,error}=await post('/auth/frozenAdmin',{id:current_admin.id,active:true});
    if(isok){
      alert("保存成功!");
    }else{
        alert("保存失败!name:"+error.name+",msg:"+error.msg);
    }
    flush();
  }
  render() {
    const { list, page, page_size,total,anchor_el } = this.state;
    return (
      <div>
        <Navigation>
        <div>
          <Paper>
              <TextField style={{marginLeft:"20px"}}  label='用户名' placeholder='用户名' multiline margin='normal' onChange={(e)=>{this.setState({user_name:e.target.value})}} />
              <TextField style={{marginLeft:"20px"}}  style={{marginLeft:"40px"}} label='手机号' placeholder='手机号'  onChange={(e)=>{this.setState({phone:e.target.value})}} multiline margin='normal' />
              <Button  style={{marginLeft:"20px"}} variant="contained" color="primary" onClick={this.search.bind(this)} >搜索</Button> 
              <Button  style={{marginLeft:"20px"}} variant="contained" color="primary" onClick={()=>{go("/auth/adminCreate")}}>创建</Button> 
            </Paper>
        </div>
        <div style={{marginTop:"20px"}}> 
          <Paper>
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>用户名</TableCell>
                    <TableCell>邮箱</TableCell>
                    <TableCell>手机号</TableCell>
                    <TableCell>是否冻结</TableCell>
                    <TableCell>创建时间</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
              <TableBody>
                  {list.map((data,index)=> {
                    return (
                      <TableRow key={data.id}>
                        <TableCell>{data.user_name}</TableCell>
                        <TableCell>{data.email}</TableCell>
                        <TableCell>{data.phone}</TableCell>
                        <TableCell>{data._active?"否":"是"}</TableCell>
                        <TableCell>{data.create_time}</TableCell>
                        <TableCell>
                          <Button variant="contained" aria-owns={anchor_el ? 'menu'+index : null} color="primary" aria-haspopup="true" onClick={this.handle_click.bind(this,data)} >操作</Button>
                                <Menu id={"menu"+index} anchorEl={anchor_el} open={Boolean(anchor_el)}   onClose={this.handle_close}  TransitionComponent={Fade} >
                                    <MenuItem onClick={this.edit_admin}>编辑 </MenuItem>
                                    {this.state.is_active?
                                    <MenuItem onClick={this.frozen_admin.bind(this)}>冻结</MenuItem>:
                                    <MenuItem onClick={this.upfrozen_admin.bind(this)}>解冻</MenuItem>}
                                </Menu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={5}
                      count={total}
                      rowsPerPage={page_size}
                      page={page}
                      onChangePage={this.handle_change_page}
                      onChangeRowsPerPage={this.handle_change_page_size}
                      ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter> 
              </Table>
            </div>
          </Paper>
        </div>
        </Navigation>
      </div>
    );
  }

}
