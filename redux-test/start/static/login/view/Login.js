import React from "react";
import { connect } from 'react-redux';
require('./style/index.css');
import { load_captcha,login_user,change } from '../action';

class Login extends React.Component{

  componentDidMount(){
    this.props.load_captcha();
  }
  
  get_verify() {
    return {__html: this.props.login.svg};
  }

  componentDidUpdate(){
     const {login}= this.props;
     if(login.code=='SUCCESS'){
      this.props._props.history.push(`/auth/home`);
     }
  }


  render(){
    const {login} =this.props;
    return(
      <div className="contain">
          <div className="title">
            <font className="font_style">后台管理系统</font>
          </div>
          <div className="login">
                <div>
                  <input type="text" value={login.user_name||''} className="user_name text" placeholder="用户名" autoComplete="off" onChange={(e)=>{this.props.change('user_name',e.target.value)}}/>
                </div>
                <div className="pass_div">
                   <input  type="password"  value={login.password||''}  className="password text"  placeholder="密码" autoComplete="new-password" onChange={(e)=>{this.props.change('password',e.target.value)}} />
                </div>
                <div className="verify_div">
                    <div className="verify_div_1">
                      <input type="text" value={login.verify||''} className="verify-input" placeholder="短信验证码"  onChange={(e)=>{this.props.change('verify',e.target.value)}}/>
                      <div className="verify" dangerouslySetInnerHTML={this.get_verify()} onClick={()=>{this.props.load_captcha();}}></div>
                   </div>
                </div>
                <div className="clear"></div>
                <div className="error">{login.msg}</div>
                <div className="login_div">
                   <button className="login_btn" onClick={()=>{this.props.login_user(login.user_name,login.password,login.verify,login.key)}}>登录</button>
                </div> 
          </div>
      </div>
    )
  }
}

const mapStateToProps = (store) =>{
  return store.login
}

const mapDispatchToProps =(dispatch) => {
  return {
    load_captcha:()=>{dispatch(load_captcha())},
    login_user:(user_name,password,verify,key)=>{dispatch(login_user(user_name,password,verify,key))},
    change:(item,value)=>{dispatch(change(item,value))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)