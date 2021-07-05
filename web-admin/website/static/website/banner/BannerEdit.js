import React from 'react';
import {post} from 'common/static/util/request';
import { Select,Radio,Button,message,Upload, Modal, Icon} from 'antd';
const RadioGroup = Radio.Group;
const Option=Select.Option;
import LongInput from 'common/static/components/input/LongInput';
import DefaultInputNumber from 'common/static/components/input/DefaultInputNumber';
import { Card,Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'


export default class BannerEditForm extends React.Component{

  state={
    fileList:[],
    previewVisible: false,
    previewImage: '',
    enable:1,
    order:0
  }

  constructor(props){
    super(props);
  }
  

  componentDidMount(){
    this.load_data();
  }


  async load_data(){
    const {id}=this.props.match.params;
    if(id){
      const {code,msg,data}=await post(`/website/get-banner`,{id});
      if(code==='SUCCESS'){
        let fileList=[];
        fileList.push({uid:data.id,url:data.url});
        const {type,id,name,href,enable,url,order}=data;
        this.setState({type,id,name,href,enable,order,url,fileList});
      }else{
        message.error('获取失败!'+msg);
      }
    }
  }

  handleChange = ({ fileList }) => {
    let url=null;
    if(fileList[0]&&fileList[0].status&&fileList[0].status=='done'){
      url=fileList[0].response.path;
    }
    this.setState({fileList,url})
  }

  handleSelectChange=(type)=> this.setState({type})

  changeRadio = (e) => {
    this.setState({
      enable: e.target.value,
    });
  }

  handlePreview = () => {
    this.setState({
      previewVisible: true,
    });
  }

  save=async()=>{
    const {id,name,type,href,enable,order,url}=this.state;
    if(!name){
      message.error('名称为空');
      return;
    }
    if(!type){
      message.error('类型为空');
      return;
    }
    if(!url){
      message.error('图片为空');
      return;
    }

    if(id){
      const {code,msg} =await post('/website/update-banner',{id,name,type,href,enable,order,url})
      if(code === 'SUCCESS'){
        alert('保存成功!')
        this.props.history.push('/website/list-banner')
      }else{
        message.error('保存失败!'+msg);
      }
    }else{
      const {code,msg} =await post('/website/create-banner',{name,type,href,enable,order,url})
      if(code === 'SUCCESS'){
        alert('保存成功!')
        this.props.history.push('/website/list-banner')
      }else{
        message.error('保存失败!'+msg);
      }
    }
  }


  render(){
    const {fileList,previewVisible,previewImage,type}=this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传</div>
      </div>
    );
    console.log(this.state);

    return(
      <div>
           <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-banner">banner列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item>banner编辑</Breadcrumb.Item>
          </Breadcrumb>
      
      <Card>
       
            <LongInput label='名称' value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}></LongInput>

            <LongInput label='跳转地址'  value={this.state.href} onChange={(e)=>{this.setState({href:e.target.value})}} ></LongInput>

          <div style={{marginTop:'20px'}}>
            <div style={{float:'left',marginTop:'5px',width:'200px',height:'20px',textAlign:'right'}}>
              <label style={{textAlign:'right'}}>类型：</label>
            </div>
            <Select style={{width:'100px'}} placeholder='类型' value={type} onChange={this.handleSelectChange}>
                  <Option value='PC'>PC</Option>
                  <Option value='APP'>APP</Option>
                  <Option value='H5'>手机站</Option>
                  <Option value='XXC'>小程序</Option>
            </Select>
          </div>

          <div style={{marginTop:'20px'}}>
            <div style={{float:'left',width:'200px',height:'20px',textAlign:'right'}}>
              <label style={{textAlign:'right'}}>状态：</label>
            </div>
            <RadioGroup style={{marginLeft:'10px'}}  name='radiogroup' onChange={this.changeRadio} value={this.state.enable}  >
                <Radio value={1}>关闭</Radio>
                <Radio value={0}>开启</Radio>
            </RadioGroup>
          </div>

          <DefaultInputNumber label='排序' min={1} max={100}  value={this.state.order} onChange={(value)=>{this.setState({order:value})}}></DefaultInputNumber>

             <div style={{marginTop:'20px',marginLeft:'150px',height:'120px'}}>
               <span style={{float:'left'}}>图片：</span>
                  <Upload 
                      action='/common/upload'
                      listType='picture-card'
                      fileList={fileList}
                      onPreview={()=>{this.handlePreview()}}
                      onChange={(fileList)=>{this.handleChange(fileList)}} >
                      {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={()=>{ this.setState({ previewVisible: false })}}>
                      <img alt='example' style={{ width: '100%' }} src={this.state.url} />
                  </Modal>
                <div style={{clear:'both'}}></div>
             </div>

            <div style={{marginLeft:'350px'}}>
              <Button type='primary' onClick={()=>{this.save()}}>提交</Button>
              <Button style={{marginLeft:'100px'}} type='primary' onClick={()=>{go('/website/list-banner')}} >返回</Button>
             </div>
     </Card>
     </div>
    )
  }
}