import React from 'react';
require('./style/style.css');
import { Layout, Menu, Icon,Breadcrumb } from 'antd';
const { Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router-dom'

export default class Navigate extends React.Component {
  
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible  collapsed={this.state.collapsed} onCollapse={this.onCollapse}  >
            <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
              <Menu.Item key="1">
                  <Link to="/home"><Icon type="pie-chart" />  <span>首页</span></Link>
              </Menu.Item>

              <SubMenu  key="sub2"  title={<span><Icon type="desktop" /><span>网站管理</span></span>}>
                  <Menu.Item key="2">
                      <Link to="/website/list-banner"><Icon type="team" />banner管理</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                      <Link to="/website/list-banner"><Icon type="team" />文章管理</Link>
                  </Menu.Item>
              </SubMenu>

              <SubMenu  key="sub1"  title={<span><Icon type="user" /><span>用户管理</span></span>}>
                  <Menu.Item key="4">
                      <Link to="/list-admin"><Icon type="team" />用户列表</Link>
                  </Menu.Item>
              </SubMenu>

              <SubMenu  key="sub3"  title={<span><Icon type="user" /><span>权限管理</span></span>}>
                  <Menu.Item key="6">
                      <Link to="/auth/list-role"><Icon type="team" />角色列表</Link>
                  </Menu.Item>
              </SubMenu>

            </Menu>
            
          </Sider>
          <Layout>
              <Content style={{ margin: '20px 20px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    {this.props.breadcrumbItem}
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    {this.props.children}
                </div>   */}
                {this.props.children}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                   design by hua_zhenguo
              </Footer>
          </Layout>
      </Layout>
    );
  }
}