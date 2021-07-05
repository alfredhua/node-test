import React from 'react'
import { connect } from 'react-redux';
import { Select,Radio,Button,message,Upload, Modal, Icon} from 'antd';

class BannerEdit extends React.Component{

  componentDidMount(){
    const {page,pageSize}=this.state;
    this.load_data(page,pageSize);
  }

  load_data(page,pageSize){
    this.props.dispatch(list_banner(page,pageSize));
  }

  render(){
    return(
      <div>
        <LongInput label='名称' defaultValue={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}></LongInput>
        <LongInput label='跳转地址'  defaultValue={this.state.href} onChange={(e)=>{this.setState({href:e.target.value})}} ></LongInput>
        <Select style={{width:'100px'}} placeholder='类型' value={type} onChange={this.handleSelectChange}>
            <Option value='PC'>PC</Option>
            <Option value='APP'>APP</Option>
            <Option value='H5'>手机站</Option>
            <Option value='XXC'>小程序</Option>
         </Select>
         <RadioGroup style={{marginLeft:'10px'}}  name='radiogroup' onChange={this.changeRadio} value={this.state.enable}  >
            <Radio value={1}>关闭</Radio>
            <Radio value={0}>开启</Radio>
          </RadioGroup>
          <Upload  action='/common/upload' listType='picture-card'>
             {/* fileList={fileList} onPreview={()=>{this.handlePreview()}} onChange={(fileList)=>{this.handleChange(fileList)}} >
            {fileList.length >= 1 ? null : uploadButton} */}
          </Upload>
          <Button type='primary' onClick={()=>{this.save()}}>提交</Button>
      </div>
    )
  }
}

const mapStateToProps = (store) =>{
  console.log(store,"------")
  return  {...store}
}

export default connect(mapStateToProps)(BannerEdit)