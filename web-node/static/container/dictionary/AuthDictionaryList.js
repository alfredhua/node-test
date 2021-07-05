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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import {flush} from '../common/Go';
import {post} from '../api';
import Navigation from '../common/naviagte/Navigation';

export default class AuthDictionaryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            page_size: 10,
            total: 0,
            list: [],
            parent_id: 0,
            parentAuthDictionary: {},
            create_open:false,
            edit_open:false,
            anchor_el: null,
            current_auth_dictionary:{},
        };
    }
    componentWillMount() {
        this.do_axios(this.state.page, this.state.page_size, this.state.parent_id);
    }

    async do_axios(page, page_size, parent_id) {
        const result = await post(
            "/dictionary/listAuthDictionary",
            {page, page_size, parent_id}
        );
        this.setState(result);
        this.setState({anchor_el: null })
    }

    handle_change_page = (event, page) => {
        this.do_axios(page, this.state.page_size,this.state.parent_id);
    };

    handle_change_page_size = event => {
        this.do_axios(this.state.page, event.target.value,this.state.parent_id);
    };

    handle_click(value,event) {
        this.setState({ anchor_el: event.currentTarget,current_auth_dictionary:value });
    };

    change_parent_id(){
        const {id}=this.state.current_auth_dictionary;
        this.do_axios(this.state.page, this.state.page_size, id);
    }
    back(){
        const {current_auth_dictionary}=this.state;
        current_auth_dictionary['id']=0; 
        this.setState({current_auth_dictionary});
        this.change_parent_id();
    }

    get_auth_dictionary=()=>{
        const {current_auth_dictionary}=this.state;
        this.setState({current_auth_dictionary,edit_open:true});
    }
    
    async del_auth_dictionary(){
        const {id}=this.state.current_auth_dictionary;
        console.log("id",id);
        const {isok} = await post( "/dictionary/delAuthDictionary",{id}); 
        if(isok){
            alert("删除成功");
        }else{
            alert("删除失败");
        }
        flush();
    }

    handle_dialog_close(){
        this.setState({create_open:false,edit_open:false});
    }

    async save_edit_auth_dictionary(){
        const {current_auth_dictionary} =this.state;
        const {isok} = await post( "/dictionary/editAuthDictionary",{current_auth_dictionary}); 
        if(isok){
            alert("保存成功");
        }else{
            alert("保存失败");
        }
        flush();
    }

    async save_dictionary(){
        const {href,value,comment}=this.state;
        const {id}=this.state.parentAuthDictionary;
        const {isok} = await post( "/dictionary/createAuthDictionary",{href,value,comment,parent_id:id}); 
        if(isok){
            alert("保存成功");
        }else{
            alert("保存失败");
        }
        flush();
    }


    set_current_auth_dictionary= (key, event) => {
        const {current_auth_dictionary} = this.state;
        current_auth_dictionary[key] = event.target.value;
        this.setState({ current_auth_dictionary });
    }



    handleClose = () => {
        this.setState({ anchor_el: null });
    };

    render() {
        const {list, page, page_size, total, parentAuthDictionary,current_auth_dictionary,anchor_el} = this.state;
        const {value, href,id} = parentAuthDictionary;
        return (
            <div>
                <Navigation>
                <div>
                    <Paper>
                        <span style={{marginLeft:"10px"}}>父节点名称: </span>  <span style={{backgroundColor:"#A0A0A0",marginLeft: "30px"}}>{value}</span>     
                        <span style={{marginLeft:"20px"}}>父节点URL: </span>  <span style={{backgroundColor:"#A0A0A0",marginLeft: "30px"}}>{href}</span>    
                        <Button style={{marginLeft:"30px"}} variant="contained" color="primary" onClick={() => {this.setState({create_open:true})}}>创建</Button>
                        {id==0?null:<Button style={{marginLeft:"10px"}} variant="contained" color="primary" onClick={this.back.bind(this)}>返回</Button>}
                    </Paper>
                </div>
                <div style={{ marginTop: "20px"}}>
                    <Paper>
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>名称</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>备注</TableCell>
                                        <TableCell>创建时间</TableCell>
                                        <TableCell>操作</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list.map((data,index) => {
                                            return (
                                                <TableRow key={data.id}>
                                                    <TableCell>{data.value}</TableCell>
                                                    <TableCell>{data.href}</TableCell>
                                                    <TableCell>{data.comment}</TableCell>
                                                    <TableCell>{data.create_time}</TableCell>
                                                    <TableCell>
                                                       <Button variant="contained" aria-owns={anchor_el ? 'menu'+index : null} color="primary" aria-haspopup="true" onClick={this.handle_click.bind(this,data)} >操作</Button>
                                                        <Menu id={"menu"+index} anchorEl={anchor_el} open={Boolean(anchor_el)}   onClose={this.handleClose}  TransitionComponent={Fade} >
                                                            <MenuItem   selected={true} onClick={this.change_parent_id.bind(this)} >查看</MenuItem>
                                                            <MenuItem onClick={this.get_auth_dictionary}>编辑 </MenuItem>
                                                            <MenuItem onClick={this.del_auth_dictionary.bind(this)}>删除</MenuItem>
                                                        </Menu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={3}
                                            count={total}
                                            rowsPerPage={page_size}
                                            page={page}
                                            onChangePage={this.handle_change_page}
                                            onChangeRowsPerPage={this.handle_change_page_size}
                                            ActionsComponent={TablePaginationActionsWrapped}/>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </Paper>
                </div>

                <div>
                    <Dialog
                        open={this.state.create_open}
                        onClose={this.handle_dialog_close.bind(this)}>
                        <DialogTitle>{"创建"}</DialogTitle>
                        <DialogContent>
                            <div>
                               <TextField  style={{width:"300px"}} label='父节点名称' placeholder='父节点名称' margin='normal' value={value} disabled/>
                            </div>
                            <div>
                              <TextField style={{width:"300px"}} label='父节点URL' placeholder='父节点URL' margin='normal' value={href} disabled/>
                            </div>
                            <div>
                              <TextField id='value' style={{width:"300px"}} label='名称' placeholder='名称' margin='normal' onChange={(e)=>{this.setState({value:e.target.value})}}  />
                            </div>
                            <div>
                               <TextField id='href' style={{width:"300px"}}  label='URL' placeholder='URL'  margin='normal' onChange={(e)=>{this.setState({href:e.target.value})}} />
                            </div>
                            <div>
                               <TextField id='comment' style={{width:"300px"}} label='备注' placeholder='备注' margin='normal' onChange={(e)=>{this.setState({comment:e.target.value})}}/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handle_dialog_close.bind(this)}  variant="contained"  color="primary">关闭</Button>
                            <Button onClick={this.save_dictionary.bind(this)}   variant="contained" color="primary" autoFocus="autoFocus"> 保存</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div>
                    <Dialog
                        open={this.state.edit_open}
                        onClose={this.handle_dialog_close.bind(this)}>
                        <DialogTitle>{"编辑"}</DialogTitle>
                        <DialogContent>
                            <div>
                               <TextField  style={{width:"300px"}} label='父节点名称' placeholder='父节点名称' margin='normal' value={value} disabled/>
                            </div>
                            <div>
                              <TextField style={{width:"300px"}} label='父节点URL' placeholder='父节点URL' margin='normal' value={href} disabled/>
                            </div>
                            <div>
                              <TextField id='value' style={{width:"300px"}} label='名称' placeholder='名称' margin='normal'  onChange={this.set_current_auth_dictionary.bind(this, "value")} value={current_auth_dictionary.value} />
                            </div>
                            <div>
                               <TextField id='href' style={{width:"300px"}}  label='URL' placeholder='URL'  margin='normal' onChange={this.set_current_auth_dictionary.bind(this, "href")} value={current_auth_dictionary.href}/>
                            </div>
                            <div>
                               <TextField id='comment' style={{width:"300px"}} label='备注' placeholder='备注' margin='normal' onChange={this.set_current_auth_dictionary.bind(this, "comment")} value={current_auth_dictionary.comment}/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handle_dialog_close.bind(this)}  variant="contained"  color="primary">关闭</Button>
                            <Button onClick={this.save_edit_auth_dictionary.bind(this)}   variant="contained" color="primary" autoFocus="autoFocus"> 保存</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                </Navigation>
            </div>
        );
    }

}

