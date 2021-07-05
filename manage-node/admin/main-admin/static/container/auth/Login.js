import React from "react";

export default class Login extends React.Component{

  constructor(props){
    super(props);

  }
  render(){
    return(
      <div className="contain">
          <div className="title">
            <font className="font_style">后台管理系统</font>
          </div>
          <div className="login">
                <div>
                   <input type="text" className="user_name text" placeholder="用户名"/>
                </div>
                <div className="pass_div">
                   <input  type="password" className="password text"  placeholder="密码"/>
                </div>
                <div className="verify_div">
                   <div>
                   <input  type="text" className="verify" placeholder="短信验证码"/>
                   <button className="verify_btn">发送</button>
                   </div>
                </div>
                 <div className="login_div">
                 <button className="login_btn">登录</button>
                </div> 
          </div>
      </div>
    )
  }
}