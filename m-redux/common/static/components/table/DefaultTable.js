import React from 'react';
import { Table} from 'antd';


export default class DefaultTable extends React.Component{
   render(){
     const {data}=this.props;
     const pagination = {
                pageSize: 10, total: 10,
                defaultPageSize: 10,
                showQuickJumper: true, showSizeChanger: true,
                showSizeChanger: true
        };
     return (
             <Table bordered rowKey='id'
              scroll={{ y: 300 }}
              size={'small'} 
              {...this.props} 
              pagination={pagination}
              dataSource={data.list} 
             />
     );
   }

}