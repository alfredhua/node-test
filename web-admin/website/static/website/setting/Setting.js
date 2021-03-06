import React from 'react';
import AuthButton from 'common/static/components/auth/AuthButton';
import {post} from 'common/static/util/request';
import { Card,Breadcrumb,Dropdown,Menu,Icon,Button,message } from 'antd';
import { Link } from 'react-router-dom'
import { Table } from 'antd';

export default class Setting extends React.Component{

    state={
      data: {
        page_num: 0,
        page_size: 10,
        list:[]
      }
    }

    componentDidMount(){
      const {page_num,page_size}=this.state.data;
      this.load_data(page_num,page_size)
    }

    async load_data(page_num,page_size){
      const {data,code,msg}= await post('/website/list-setting',{page_num,page_size});
      if(code === 'SUCCESS'){
          this.setState({data});
      }else{
        message.error("加载失败!"+msg);
      }
    }

    async update_status(id,status){
      const {page_num,page_size}=this.state.data;
      const {code,msg}= await post('/website/update-setting-status',{id,status});
      if(code === 'SUCCESS'){
        message.success("修改成功!");
        this.load_data(page_num,page_size)
      }else{
        message.error("修改失败!"+msg);
      }
    }

   get_menu(data){
      return(
        <Menu>
            {data.status==0?
            <AuthButton onClick={()=>{this.update_status(data.key,1)}} auth_list={this.props.auth_list} auth_path='/website/setting/open' auth_type='menu-item'>开启</AuthButton>:
            <AuthButton onClick={()=>{this.update_status(data.key,0)}}  auth_list={this.props.auth_list} auth_path='/website/setting/close' auth_type='menu-item'>关闭</AuthButton>}
        </Menu>
      );
    }

    render(){
      const columns = [
        {
          title: 'id',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
        },{
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render:(status)=>{
            return status===0?"关闭":"开启"
          }
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (data) => (
            <div>
                <Dropdown overlay={this.get_menu(data)} placement="bottomLeft">
                  <Button>操作<Icon type="down" /></Button>
                </Dropdown> 
            </div>
          )
        }
      ];

      const {list}=this.state.data;
      return(
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/setting">网站设置</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Card>
               <Table columns={columns} dataSource={list} />,
          </Card>
        </div>
      )
     }
}