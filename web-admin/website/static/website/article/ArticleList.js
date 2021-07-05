import React from 'react';
import DefaultTable from 'common/static/components/table/DefaultTable';
import AuthButton from 'common/static/components/auth/AuthButton';
import {post} from 'common/static/util/request';
import { message,Modal } from 'antd';
import { Card,Breadcrumb,Select } from 'antd';
import { Link } from 'react-router-dom'
const Option = Select.Option;

export  default class ArticleList extends React.Component{

 constructor(props){
   super(props);
    this.state={
      data: {
        page_num: 0,
        page_size: 10,
        list:[],
        publish_modal:false,
        type:'',
        id:'',
        articletTypeList:[],
      },
      type:1,
    }
 }

  componentDidMount(){
    this.load_data(this.state.page_num,this.state.page_size);
  }

  async load_data(page_num,page_size){
   const {search_type} = this.props.match.params;
    const {type}=this.state;
    const result= await post('/website/list-article',{page_num,page_size,type:search_type==""||search_type==null?type:search_type});
    const article_type_result=await post('/dictionary/list-all-article-type',{});
    if( result.code === 'SUCCESS'){
      this.setState({data:result.data,articlet_type_list:article_type_result.data,type:search_type==""||search_type==null?type:search_type});
    }else{
      message.error('加载失败!'+msg);
    }
  }

  

  get_title() {
    const {articlet_type_list,type} =this.state;
    return (
      <div>
          <Select style={{ width: 120 }} onChange={(value,event)=>{this.setState({type:value})}} value={type} >
                <Option key={1} value={1}>{"全部"}</Option>
                {articlet_type_list&&articlet_type_list.map((item)=>{
                      return( <Option key={item.id} value={item.type}>{item.name}</Option>)
                })}
         </Select>

         <AuthButton style={{marginLeft:10}} auth_list={this.props.auth_list} auth_path='/website/article/list' 
          auth_type='button' size='small' type='primary' onClick={()=>{this.load_data(this.state.page_num,this.state.page_size)}}> 搜索</AuthButton>

        <AuthButton style={{marginLeft:10}} auth_list={this.props.auth_list} auth_path='/website/article/create' 
          auth_type='button' size='small' type='primary' onClick={()=>{this.props.history.push(`/website/create-article`)}}> 添加</AuthButton>
      </div>
    );
  }

  delete= async(id)=>{
    const {code,msg}= await post('/website/del-article',{id});
    if(code === 'SUCCESS'){
      message.info('删除成功!');
    }else{
      message.error('删除失败!'+msg);
    }
    this.load_data(this.state.page_num,this.state.page_size);
  }

  publish= async(id)=>{
    const {code,msg}= await post('/website/publish-article',{id});
    if(code === 'SUCCESS'){
      message.error('发布成功!');
      this.load_data(this.state.page_num,this.state.page_size);
      this.setState({publish_modal:false})
    }else{
      message.error('发布失败!'+msg);
    }
  }

  handle_ok = () => {
    const {type,id}=this.state;
    if(type=='PUBLISH'){
      this.publish(id);
    }else{
      this.delete(id);
    }
  }

  get_articlet_type=(articlet_type)=>{
    const {articlet_type_list}=this.state;
    var name;
    articlet_type_list.map((item)=>{
      if(item.type===articlet_type ){
        name=item.name; 
      }
    });
    return name;
  }

  render(){
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 150,
      align: 'center'
    },{
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 150,
      align: 'center',
      render:(type)=>{
        return this.get_articlet_type(type);
      }
    }, {
      title: '状态',
      dataIndex: 'isPublish',
      key: 'isPublish',
      width: 50,
      align: 'center',
      render:(publish)=>{
          return publish?'开启':'关闭';
      }
    }, {
      title: '浏览次数',
      dataIndex: 'click_count',
      key: 'click_count',
      width: 100,
      align: 'center'
    },{
      title: '排序',
      dataIndex: 'ordering',
      key: 'ordering',
      width: 50,
      align: 'center'
    },,{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
      align: 'center'
    }, ,{
      title: '发布时间',
      dataIndex: 'publish_time',
      key: 'publish_time',
      width: 200,
      align: 'center'
    },  {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center',
      render: (data) => (
        <span>
            {data.publish==0?
            <AuthButton auth_list={this.props.auth_list} auth_path='/website/article/publish' auth_type='tag' checked={true} onClick={() => {this.setState({id:data.id,publish_modal:true,type:'PUBLISH'}) }} >发布</AuthButton>:null}
            <AuthButton auth_list={this.props.auth_list} auth_path='/website/article/edit'  auth_type='tag'checked={true} onClick={() => {this.props.history.push(`/website/edit-article/${data.id}`) }} >编辑</AuthButton>
            <AuthButton auth_list={this.props.auth_list} auth_path='/website/article/del'  auth_type='tag' checked={true} onClick={() => {this.setState({id:data.id,publish_modal:true,type:'DELETE'})}} >删除</AuthButton>
        </span>
      )
    }
    ];

    return(
      <div>
         <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-article">文章列表</Link></Breadcrumb.Item>
          </Breadcrumb>

         <Card>
            <DefaultTable 
              title={() => { return this.get_title() }}
              columns={columns}
              data={this.state.data}
              onChange={(pageInfo) => { this.change(pageInfo) }} 
            />
          </Card>
           <Modal title='确认' visible={this.state.publish_modal}
            okText={'确定'} cancelText={'取消'}
            onOk={()=>{this.handle_ok()}} onCancel={()=>{this.setState({publish_modal: false})}} >
              确认{this.state.type=='PUBLISH'?'发布':'删除'}？
           </Modal>
        </div>

    );
  }

}