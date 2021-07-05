import React from "react";
import css from './style/login.css';
var classNames = require('classnames');

console.log(css);
export default class Login extends React.Component{

  constructor(props){
    super(props);

  }
  render(){
    return(
      <div className={classNames(css.contain)}>
          <div className={classNames(css.title)}>
            <font className={classNames(css.font_style)}>后台管理系统</font>
          </div>
          <div className={classNames(css.login)}>
                <div>
                   <input type="text" className={classNames(css.user_name, css.text)} placeholder="用户名"/>
                </div>
                <div className={classNames(css.pass_div)}>
                   <input  type="password" className={classNames(css.password,css.text)}  placeholder="密码"/>
                </div>
                <div className={classNames(css.verify_div)}>
                   <div>
                   <input  type="text" className={classNames(css.verify)} placeholder="短信验证码"/>
                   <button className={classNames(css.verify_btn)}>发送</button>
                   </div>
                </div>
                 <div className={classNames(css.login_div)}>
                 <button className={classNames(css.login_btn)}>登录</button>
                </div> 
          </div>
      </div>
    )
  }
}