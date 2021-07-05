import React from 'react';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import {post} from 'common/static/util/request';
import { Input,Radio,InputNumber,Button, message,Select,Card,Breadcrumb } from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
import { Link } from 'react-router-dom'

export default class ArticleEdit extends React.Component{

    state = {
        editor_state: BraftEditor.createEditorState(null),
        articlet_type_list:[],
        article:{publish:0}
    }

    async componentDidMount () {
        this.load_data();
    }

    async load_data(){
        const {id}=this.props.match.params;
        let {article,editor_state}=this.state;
        if(id){
          const {code,data,msg}=await post('/website/get-article',{id});
          if(code === 'SUCCESS'){
            article=data;
            editor_state=BraftEditor.createEditorState(article.context)
          }else{
            message.error("加载失败！"+msg);
          }
        }
        const {code,data,msg}=await post('/dictionary/list-active-article-type',{});
        if(code === 'SUCCESS'){
          this.setState({articlet_type_list:data,article,editor_state});
        }else{
          message.error("加载失败！"+msg);
        }
    }

    save =async()=>{
      let {article} =this.state;
      article['context']=this.state.editor_state.toHTML();
      const {id}=this.props.match.params;
      let result;
      if(id){
         result=await  post('/website/update-article',{article});
      }else{  
        result=await  post('/website/create-article',{article});
      }
      const {code,msg} =result;
      if(code === 'SUCCESS'){
         message.success("保存成功!",1,()=>{this.props.history.push("/website/list-article")});
      }else{
        message.error("保存失败！"+msg);
      }
    }
   
    handle_editorChange = (editorState) => {
       
    }

   
    handleChange(value,event){
      let { article } =this.state;
      article['type']=value;
      this.setState({article})
    }

    change(attribute,value){
      const {id}=this.props.match.params;
      if( attribute == "publish" && !id){
         message.error("首次创建时，默认未发布状态!");
         return;
      }
      let { article } =this.state;
      article[attribute]=value;
      this.setState({article});
    }

  render(){
    const { editor_state,articlet_type_list,article} = this.state
    return(
      <div >
          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>网站管理</Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/website/list-article">文章列表</Link></Breadcrumb.Item>
              <Breadcrumb.Item>文章编辑</Breadcrumb.Item>
          </Breadcrumb>
        <Card>
              <Input addonBefore="标题：" onChange={(e)=>{this.change("title",e.target.value)}} value={article.title} />
              <div style={{marginTop:'10px'}}>
                 <div style={{width: '80px',height:'32px',lineHeight:'32px',border:'1px solid #d9d9d9',
                            float:'left',textAlign:'center',margin:'0 auto',
                              backgroundColor:'#fafafa',display:'block'}} >类型:</div>
                <Select style={{ width: 120 }} onChange={this.handleChange.bind(this)} value={article.type} >
                    {articlet_type_list&&articlet_type_list.map((item)=>{
                      return( <Option key={item.id} value={item.type}>{item.name}</Option>)
                    })}
                </Select>
              </div>
              <div style={{marginTop:'10px'}}>
                <div style={{width: '80px',height:'32px',lineHeight:'32px',border:'1px solid #d9d9d9',
                            float:'left',textAlign:'center',margin:'0 auto',
                              backgroundColor:'#fafafa',display:'block'}} >是否发布:</div>
                <RadioGroup style={{marginTop:'5px',marginLeft:'10px'}}  onChange={(e)=>{this.change("publish",e.target.value)}}   value={article.publish}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup> 
              </div>

              <div style={{marginTop:'20px'}}>
              <div style={{width: '80px',height:'32px',lineHeight:'32px',border:'1px solid #d9d9d9',
                            float:'left',textAlign:'center',margin:'0 auto',
                              backgroundColor:'#fafafa',display:'block'}} >排序:</div>
                 <InputNumber min={1} max={10} disabled={this.state.disabled} value={article.ordering} onChange={(value)=>{this.change("ordering",value)}} />
              </div>

              <div style={{clear:'both',marginTop:'20px'}}></div>
              <BraftEditor style={{border:'1 auto'}} value={editor_state} onChange={(editor_state)=>{ this.setState({ editor_state })}} />

              <div>
                <Button type='primary' onClick={this.save.bind(this)}>保存</Button>
                <Button type='primary' onClick={()=>{goBack()}} >返回</Button>
              </div>
          </Card>
       </div>
    )
  }
}