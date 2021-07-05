import React from 'react';
require('./style/style.css');
import { Layout, Menu, Icon, } from 'antd';
const { Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router-dom'
import menu_list from './menu';
import {isok} from '../../util/Auth';

export default class Navigate extends React.Component {
  
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  get_sub_menu(item,partner_index){
    return(
      <SubMenu  key={partner_index}  title={<span><Icon type={item.icon} /><span>{item.label}</span></span>}>
          {item.sub_menu.map((sub_item,index)=>{
             if(isok(this.props.user_auth_list,sub_item.path)){
                return(
                  <Menu.Item key={partner_index+"-"+index}>
                    <Link to={sub_item.link}><Icon type={sub_item.icon} />{sub_item.label}</Link>
                  </Menu.Item>
                )
             }
          })}
      </SubMenu>
    )
  }

  render() {
    return (
      <Layout style={{minHeight:'100vh'}}>
          <Sider collapsible  collapsed={this.state.collapsed} onCollapse={this.onCollapse}  >
            <div className="logo" />
              <Menu theme="dark" mode="inline">
                {menu_list.map((item,index)=>{
                  if(item.sub_menu){
                     return  this.get_sub_menu(item,index);
                   }else{
                      if(isok(this.props.user_auth_list,item.path)){
                        return (
                          <Menu.Item key={index}>
                            <Link to={item.link}><Icon type={item.icon} />  <span>{item.label}</span></Link>
                          </Menu.Item>
                        )
                      }
                     
                  }
                })}
            </Menu>
          </Sider>

          <Layout>
              <Content style={{ margin: '20px 20px' }}>
                <div style={{  minHeight: 360 }}>
                     {this.props.children}
                </div>   
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                   design by hua_zhenguo
              </Footer>
          </Layout>
      </Layout>
    );
  }
}