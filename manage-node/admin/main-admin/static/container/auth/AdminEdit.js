import React from 'react'
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import {post} from '../api';
import {go_back,go} from 'common-admin/src/Go';
import {validate_phone,validate_email} from 'common-admin/src/util/validate';
import {withStyles} from '@material-ui/core/styles';
import css from './css/Css';
class AdminCreate extends React.Component {
    constructor(props) {
        super(props)
        this.user_name =null;
        this.phone=null;
        this.email=null;
        this.state = {
            show_password: false,
            list:[],
            dealing:false,
            admin:{ id:"",password: '',user_name:"",phone:"",email:"",is_active: true, checked: [0],},
        }

    }

    componentWillMount(){
      this.get_role_list(); 
      this.get_edit_admin();
    }

    async get_role_list(){
       const result= await post("/auth/listAllRole",{});
       this.setState({list:result});
    }

    async get_edit_admin(){
        const {id}=this.props.match.params;
        if(id){
          const result= await post("/auth/getAdminById",{id});
          if(result){
              let {admin}=this.state;
              const {id,user_name,phone,password,email,role_list_json,_active}=result;
              admin["id"]=id;
              admin["password"]=password;
              admin["user_name"]=user_name;
              admin["checked"]=JSON.parse(role_list_json);
              admin["phone"]=phone;
              admin["email"]=email;
              admin["is_active"]=_active;
              this.setState({admin});   
          }
        }
    }

    async save_admin() {
        const {admin}=this.state;
        this.setState({dealing:true});
        if(this.save_validate(admin)){
            const {isok,error}=await post("/auth/saveAdmin",{admin});
            if(isok){
                alert("保存成功!");
                this.setState({dealing:false});
                go_back()
            }else{
                alert("保存失败!name:"+error.name+",msg:"+error.msg);
            }
        }else{
            this.setState({dealing:false});
        }
    }

    save_validate(obj){
        const {user_name,phone,email}=obj;
        if(!user_name||user_name==""){
            this.setState({user_name_error:true});
            this.user_name.focus();
            return false;
        }
        if(!phone||phone=="" ||!validate_phone(phone)){
            this.setState({phone_error:true});
            this.phone.focus();
            return false;
        }
        if(!email||email==""||!validate_email(email)){
            this.setState({email_error:true});
            this.email.focus();
            return false;
        }
        this.setState({dealing:false,email_error:false,phone_error:false,user_name_error:false});
        return true;
    }

    handle_click_show_password = () => {
        this.setState({
            show_password: !this.state.show_password
        });
    };

    handle_mouse_down_password = event => {
        event.preventDefault();
    };

    handle_active(){
        let {admin}=this.state;
        admin["is_active"]=!admin["is_active"]
        this.setState({admin})
    }

    handle_change = prop => event => {
        let {admin}=this.state;
        admin[prop]=event.target.value;
        this.setState({admin});
    };

    handle_toggle = value => () => {
        const { admin } = this.state;
        const currentIndex = admin.checked.indexOf(value);
        const newChecked = [...admin.checked];
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        admin.checked=newChecked;
        this.setState({ admin});
      };

    render() {
        const {classes} = this.props;
        const {list,admin}=this.state;
        return (
            <div>
                <div>
                    <TextField value={admin.user_name} required error={this.state.user_name_error} inputRef={el => this.user_name = el} className={classNames(classes.input)} label='用户名' placeholder='用户名' multiline margin='normal' onChange={this.handle_change('user_name')}/>
                </div>
                <div>
                    <FormControl className={classNames(classes.password_input_label)}>
                      <InputLabel htmlFor="password" required >密码</InputLabel>
                        <Input id="password" value={admin.password}  type={this.state.show_password ? 'text' : 'password'} onChange={this.handle_change('password')}
                            endAdornment={
                            <InputAdornment position = "end" > <IconButton  onClick={this.handle_click_show_password} onMouseDown={this.handle_mouse_down_password}>
                                { this.state.show_password ? <VisibilityOff/> : <Visibility/> }
                            </IconButton>
                           </InputAdornment>}
                        />
                    </FormControl>
                </div>
                <div>
                    <TextField  required value={admin.phone} error={this.state.phone_error} inputRef={el => this.phone = el}  className={classNames(classes.input)} label='手机号' placeholder='手机号' multiline  margin='normal' onChange={this.handle_change('phone')} />
                </div>
                <div>
                    <TextField required value={admin.email} error={this.state.email_error} inputRef={el => this.email = el} className={classNames(classes.input)} label='邮箱' placeholder='邮箱' multiline margin='normal'  onChange={this.handle_change('email')}/>
                </div>
                <div className={classNames(classes.row_div)}>
                   <span >是否激活：</span>
                    <Switch  checked={admin.is_active} onChange={this.handle_active.bind(this)} value="is_active" color="primary" />
                </div>
                <div className={classNames(classes.row_div)}>
                    <span>角色：</span>
                    <List  style={{ width: '300px',  marginLeft: '50px',marginTop: "-50px" }}>
                         {list&&list.map(item => (
                                <ListItem key={item.id} role={undefined} dense button onClick={this.handle_toggle(item.id)}>
                                    <Checkbox tabIndex={-1} disableRipple  checked={admin.checked.indexOf(item.id) !== -1}  color="primary"  />
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                          ))} 
                    </List>
                </div>
                <div className={classNames(classes.row_div)}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.save_admin.bind(this)} disabled={this.state.dealing}>保存</Button>
                    <Button style={{ marginLeft: "50px"}} variant="contained" color="primary" onClick={()=>{go_back()}}>返回</Button>
                </div>
            </div>
        );
    }
}

AdminCreate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(css)(AdminCreate);