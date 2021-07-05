import React from 'react';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import {post} from 'common/static/util/request';
import { Input,Button, message,Card,Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

export default class ArticleEdit extends React.Component{

    state = {
        editor_state: BraftEditor.createEditorState(null),
        title:null,
        id:null
    }

    async componentDidMount () {
      const {id}=this.props.match.params;
      this.load_data(id);
    }

    async load_data(id){
      const {data,code,msg}= await post('/website/get-produce-detail',{produce_id:id});
      if(code === 'SUCCESS'){
          let editor_state=BraftEditor.createEditorState(data.context)
          this.setState({editor_state,id:data.id});
      }else{
         message.error("加载失败!"+msg);
      }
    }

    async save(){
      const {id,editor_state}=this.state;
      let result;
      if(!id&&id==null){
        result= await post('/website/create-produce-detail',{produce_id:this.props.match.params.id,context:editor_state.toHTML()});
      }else{
        result= await post('/website/update-produce-detail',{id,produce_id:this.props.match.params.id,context:editor_state.toHTML()});
      }
      if(result && result.code === 'SUCCESS' ){
        message.success("保存成功",1,()=>{this.props.history.push(`/website/list-produce`)});
      }else{
        message.error("保存失败!"+result.msg);
      }

    }

  render(){
    const { editor_state } = this.state
    return(
      <div >
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-produce">产品列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item>编辑产品内容</Breadcrumb.Item>
          </Breadcrumb>
        <Card>
              <Input addonBefore="标题：" disabled value={this.props.history.location.state.title} />
              <div style={{clear:'both',marginTop:'20px'}}></div>
              <BraftEditor style={{border:'1 auto'}} value={editor_state} onChange={(editor_state)=>{ this.setState({ editor_state })}} />
              <div>
                <Button type='primary' onClick={()=>{this.save()}}>保存</Button>
              </div>
          </Card>
       </div>
    )
  }
}