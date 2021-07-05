import React from 'react'
import { list_banner } from '../actions/banner';
import { connect } from 'react-redux';
import DefaultTable from 'common/static/components/table/DefaultTable';

class BannerList extends React.Component{
    constructor(props){
      super(props);
      this.state={
        page:1,
        pageSize:10
      }
    }

    componentDidMount(){
      const {page,pageSize}=this.state;
      this.load_data(page,pageSize);
    }

    load_data(page,pageSize){
      this.props.dispatch(list_banner(page,pageSize));
    }

    getTitle() {
      return (
        <div>
          {/* <AuthButton size='small' auth='/website/create-banner' size='small' type='primary' onClick={()=>{go('/website/create-banner')}}> 添加</AuthButton> */}
        </div>
      );
    }
    
    render(){
      const columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        align: 'center'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 150,
        align: 'center',
        render:(data)=>{
          return bannerType[data];
        }
      }, {
        title: '状态',
        dataIndex: 'enable',
        key: 'enable',
        width: 150,
        align: 'center',
        render:(enable)=>{
           if(enable){
            return "关闭";
           }else{
            return "开启";  
           }
        }
      }, {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        width: 150,
        align: 'center'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        align: 'center'
      }, {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (data) => (
            <span>
            {/* <AuthCheckableTag auth='/website/edit-banner'  checked={true} onChange={() => { go(`/website/edit-banner/${data.id}`) }} >编辑</AuthCheckableTag>
                <AuthCheckableTag auth='/website/delete-banner'  checked={true} onChange={() => {this.delete(data.id) }} >删除</AuthCheckableTag> */}
            </span>
        )
      }
      ];
      const {banner}=this.props;
      return(
        <div>
          <DefaultTable 
            title={() => { return this.getTitle() }}
            columns={columns}
            data={banner}
            onChange={(pageInfo) => { this.change(pageInfo) }} 
          />  
        </div>
      )
    }
}
const mapStateToProps = (store) =>{
  const {website}=store;
  return  {...website}
}

export default connect(mapStateToProps)(BannerList)