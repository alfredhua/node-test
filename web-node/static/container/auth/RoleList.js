import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {post} from '../api';
import TableHead from '@material-ui/core/TableHead';
import TablePaginationActionsWrapped from '../common/table/TablePaginationActions';
import Button from '@material-ui/core/Button';
import Navigation from '../common/naviagte/Navigation';

export default class RoleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page:0,
      pageSize:10,
      total:0,
      list:[]
    };
  }

  componentWillMount(){
    this.do_axios(this.state.page,this.state.pageSize);
  }

  async do_axios(page,pageSize){
    const result=await post("/auth/listRoles",{page,pageSize});
    this.setState(result);
  }

  handle_change_page = (event, page) => {
    this.do_axios(page, this.state.pageSize);
  };

  handle_change_page_size = event => {
    this.do_axios(this.state.page, event.target.value);
  };
  edit_role=(id)=>{
     go(`/auth/roleEdit/${id}#role`)
  };

  render() {
    const { list, page, pageSize,total } = this.state;
    return (
      <div>
        <Navigation>
         <div>
           <Paper style={{height:"50px"}}>
              <Button  style={{marginLeft:"20px",marginTop:"5px"}} variant="contained" color="primary" onClick={()=>{go("/auth/roleCreate")}}>创建</Button> 
           </Paper>
        </div>

        <div style={{marginTop:"20px"}}> 
         <Paper >
          <div >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>角色名</TableCell>
                  <TableCell>创建时间</TableCell>
                  <TableCell>备注</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map(data => {
                  return (
                    <TableRow key={data.id} >
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.create_time}</TableCell>
                      <TableCell>{data.comment}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={()=>{this.edit_role(data.id)}} >编辑</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={total}
                    rowsPerPage={pageSize}
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

