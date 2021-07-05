import React from "react";
require('./style/index.css');
import {post} from 'common/static/util/request';

export default  class Login extends React.Component{

  constructor(props){
    super(props);
    this.state={
      login:{

      },
      svg:null,
      key:null
    }
  }
  componentDidMount(){
    this.check_login();
  }

  async load_captcha(){
    const {svg,key} = await post("/common/captcha",{});
    this.setState({svg,key})
  }

  async check_login(){
    const {code,msg,data} = await post("/check-login",{});
    if(code==='SUCCESS'){
      this.props._props.history.push(`/auth/home`);
      return;
    }
    const {svg,key} = await post("/common/captcha",{});
    this.setState({svg,key})
  }

  async change(item,value){
    let {login} =this.state;
    login[item]=value;
    this.setState({login})
  }

  async login_user(){
    let {login,key}=this.state;
    const {user_name,password,verify}=login;
    const {code,msg,data} = await post("/login",{user_name,password,verify,key});
   if(code === 'SUCCESS' ){
      this.props._props.history.push(`/auth/home`);
   }else{
    login['msg']=msg;
    const {svg,key} = await post("/common/captcha",{});
    this.setState({login,svg,key});
   }
  }
  
  get_verify() {
    return {__html: this.state.svg};
  }

  render(){
    const {login} =this.state;
    return(
      <div className="contain">
          <div className="title">
            <font className="font_style">后台管理系统</font>
          </div>
          <div className="login">
                <div>
                  <input type="text" value={login.user_name||''} className="user_name text" placeholder="用户名" autoComplete="off" onChange={(e)=>{this.change('user_name',e.target.value)}}/>
                </div>
                <div className="pass_div">
                   <input  type="password"  value={login.password||''}  className="password text"  placeholder="密码" autoComplete="new-password" onChange={(e)=>{this.change('password',e.target.value)}} />
                </div>
                <div className="verify_div">
                    <div className="verify_div_1">
                      <input type="text" value={login.verify||''} className="verify-input" placeholder="短信验证码"  onChange={(e)=>{this.change('verify',e.target.value)}}/>
                      <div className="verify" dangerouslySetInnerHTML={this.get_verify()} onClick={()=>{this.load_captcha();}}></div>
                   </div>
                </div>
                <div className="clear"></div>
                <div className="error">{login.msg}</div>
                <div className="login_div">
                   <button className="login_btn" onClick={()=>{this.login_user()}}>登录</button>

                </div> 
          </div>
      </div>
    )
  }
}