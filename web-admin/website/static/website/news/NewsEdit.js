import React from 'react';
import AuthButton from 'common/static/components/auth/AuthButton';
import {post} from 'common/static/util/request';
import { Link } from 'react-router-dom'
import { Card,Breadcrumb,Form,Modal,message,Button,Upload,Input,Icon } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css';

var {TextArea}=Input;
class NewsEdit extends React.Component{
    state={
      pic_list:[],
      preview_visible:false,
      preview_image:null,
      pic:null,
      context:null
    }

    componentDidMount(){
      this.load_data();
    }

    async load_data(){
      const {id}=this.props.match.params;
      if(id){
        const {code,msg,data}=await post(`/website/get-news`,{id});
        if(code==='SUCCESS'){
          const { setFieldsValue } = this.props.form;
          const { title,pic,source,source_url,introduce,context}=data;
          setFieldsValue({ title,pic,source,source_url,introduce});
          this.setState({pic_list:[{uid:id,url:pic}],context:BraftEditor.createEditorState(context)})
        }else{
          message.error('获取失败!'+msg);
        }
      }
    }

    async save(values){
      const{ pic,context } =this.state;
      const {id}=this.props.match.params;
      const result =await post('/website/save-news',{id,...values,pic,context:context.toHTML()})
      if(result && result.code === 'SUCCESS' ){
        message.success("保存成功",1,()=>{this.props.history.push(`/website/list-news`)});
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
      if(file.status=='done'){
        url=file.response.path;
        this.setState({pic:url})
      }
      this.setState({pic_list:fileList})
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
      const {pic_list,preview_visible,pic,context} =this.state;
      return(
        <div>
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-news">新闻列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-news">新闻编辑</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Card>
          <Form {...formItemLayout} onSubmit={this.submit}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required:true,
                        message: '请输入产品名称',
                      },
                    ],
                  })(<Input placeholder="标题" />)}
                </Form.Item>

                <Form.Item label="来源">
                  {getFieldDecorator('source')(<Input placeholder="来源" />)}
                </Form.Item>
                <Form.Item label="来源地址">
                  {getFieldDecorator('source_url')(<Input placeholder="来源地址" />)}
                </Form.Item>
                <Form.Item label="图片">
                  {getFieldDecorator('pic', {
                    rules: [
                      {
                        required:true,
                        message: '请上传图片',
                      },
                    ],
                  })(<div>
                        <Upload
                              action='/common/upload'
                              listType="picture-card"
                              fileList={pic_list}
                              onPreview={()=>{this.setState({ preview_visible:true })}}
                              onChange={({file,fileList})=>{this.handle_change(file,fileList)}}>
                              {pic_list&&pic_list.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal footer={null} visible={preview_visible}  onCancel={()=>{this.setState({preview_visible:false})}}>
                          <img alt="example" style={{ width: '100%' }} src={pic} />
                        </Modal>
                    </div>
                  )}
              </Form.Item>

                <Form.Item label="简介">
                  {getFieldDecorator('introduce', {
                    rules: [
                      {
                        required:true,
                        message: '简介不能为空',
                      },
                    ],
                  })(<TextArea min={0} placeholder="简介" rows={4} />)}
                </Form.Item>

                <BraftEditor style={{border:'1 auto'}} value={context} onChange={(context)=>{ this.setState({ context })}} />

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

export default Form.create()(NewsEdit);