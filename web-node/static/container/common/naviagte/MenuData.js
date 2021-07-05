import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import NavigationListItem from './NavigationListItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class MenuData   extends React.Component {

  state = { open: false };
  
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  getNestedItems(items){
    return items;
  }

  render(){
    return(
        <div>
            <ListItem button onClick={()=>{ window.open("/home", "_self");}}>
              <ListItemIcon>
                <SvgIcon>  
                   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </ListItemIcon> 
              <ListItemText primary="首页"  />
            </ListItem>

            <NavigationListItem primaryValue="权限管理" icon="auth" name="auth"
                  items={this.getNestedItems(
                 [{href:"/auth/adminList",text:"员工管理",icon:"admin"},
                  {href:"/auth/roleList",text:"角色列表",icon:"role"}])} />

            <NavigationListItem primaryValue="文章管理" href={"/article/articleList"}  icon="article"/>

            <NavigationListItem primaryValue="数据字典" icon="dictionary" name="dictionary"
              items={this.getNestedItems(
                 [{href:"/dictionary/authDictionaryList",text:"权限字典",icon:"authDictionary"}])}/>
        </div>
    );
  }
}

MenuData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuData);