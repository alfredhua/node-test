import React from 'react';
import { Breadcrumb } from 'antd';

export default class DefaultBreadcrumb extends React.Component{
   render(){
     return (
      <Breadcrumb style={{ margin: '16px 0' }}>
          {this.props.children}
      </Breadcrumb>
     );
   }

}