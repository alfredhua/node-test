import React from 'react';
import {post} from '@common/util/request';
import { Breadcrumb,Card,message } from 'antd';
import { Link } from 'react-router-dom'
import {
  Form,
  Button,
  Upload,
  Input
} from 'antd';
import {  Icon, Modal } from 'antd';
class PartnerEdit extends React.Component{
    state={
      pic_list:[],
      preview_visible:false,
      preview_image:null,
      pic:null,
      context:null
    }

    componentDidMount(){
      const {id}=this.props.match.params;
      if(id){
        this.load_data(id);
      }
    }

    async load_data(id){
        const {code,msg,data}=await post(`/website/get-partner`,{id});
        if(code==='SUCCESS'){
          const { setFieldsValue } = this.props.form;
          const { name,href,pic_url}=data;
          setFieldsValue({ name,href,pic_url});
          this.setState({pic_url,pic_list:[{uid:id,url:pic_url}]})
        }else{
          message.error('获取失败!'+msg);
        }
    }

    async save(values){
      const {id}=this.props.match.params;
      const {pic_url} =this.state;
      const result =await post('/website/save-partner',{id,...values,pic_url})
      if(result && result.code === 'SUCCESS' ){
        message.success("保存成功",1,()=>{this.props.history.push(`/website/list-partner`)});
      }else{
        message.error("保存失败!"+result.msg);
      }
    }

    submit=(e)=>{
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.save(values)
        }
      });
    }


    handle_change = (file,fileList) => {
      let url=null;
      if(file.status==='done'){
        url=file.response.path;
        this.setState({pic_url:url,pic_list:fileList})
      }else{
        this.setState({pic_list:fileList})
      }
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传</div>
        </div>
      );
      const {pic_list,preview_visible,pic_url} =this.state;
      
      return(
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-partner">合作伙伴列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/create-partner">合作伙伴编辑</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Card>
          <Form {...formItemLayout} onSubmit={this.submit}>
                <Form.Item label="名称">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required:true,
                        message: '请输入名称',
                      },
                    ],
                  })(<Input placeholder="名称" />)}
                </Form.Item>

                <Form.Item label="链接">
                  {getFieldDecorator('href', {
                    rules: [
                      {
                        required:true,
                        message: '请输入链接',
                      },
                    ],
                  })(<Input placeholder="链接" />)}
                </Form.Item>
               
                <Form.Item label="图片(160*70)">
                  {getFieldDecorator('pic_url', {
                    rules: [
                      {
                        required:true,
                        message: '请上传图片',
                      },
                    ],
                  })(<div>
                        <Upload
                              action='/api/common/upload'
                              listType="picture-card"
                              fileList={pic_list}
                              onPreview={()=>{this.setState({ preview_visible:true })}}
                              onChange={({file,fileList})=>{this.handle_change(file,fileList)}}>
                              {pic_list&&pic_list.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal footer={null} visible={preview_visible}  onCancel={()=>{this.setState({preview_visible:false})}}>
                          <img alt="example" style={{ width: '100%' }} src={pic_url} />
                        </Modal>
                    </div>
                  )}
              </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
          </Card>
        </div>
      )
     }
}

export default Form.create()(PartnerEdit);