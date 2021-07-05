import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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

class NavigationListItem   extends React.Component {

  constructor(props) {
    super(props)
    this.state = { open: false };
  }

  handle_click = () => {
    const {items} =this.props;
    if(items){
      this.setState({ open: !this.state.open });
    }else{
      //跳转页面
       window.open(this.props.href, "_self");
    }
  };

  handle_click_item(href){
    window.open(href, "_self");
  }

  get_is_expand(){
    const {items} =this.props;
    const {open}=this.state;
    if(items){
      return (
        <div>
          { open ? <ExpandLess /> : <ExpandMore /> }
        </div>
      );
    }else{
      return (<span></span>);
    }
  }

  render(){
    
    const { classes,primaryValue,items } = this.props;

    return(
        <div>
               <ListItem button onClick={this.handle_click}>
                  <ListItemIcon>
                     <svg style={{width:"24px",height:"24px"}} dangerouslySetInnerHTML={{__html:  require('./icon/'+this.props.icon+'.svg') }} />
                  </ListItemIcon> 
                <ListItemText primary={primaryValue} />
                  {this.get_is_expand()}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {items&&items.map((item,index)=>{
                    return (
                        <ListItem button className={classes.nested} key={index} onClick={()=>{this.handle_click_item(item.href)}}>
                          <ListItemIcon>
                            <svg  style={{width:"24px",height:"24px"}} dangerouslySetInnerHTML={{__html:  require('./icon/'+item.icon+'.svg') }} />
                          </ListItemIcon>
                          <ListItemText inset primary={item.text} />
                        </ListItem>
                    );
                  })} 
                </List>
               </Collapse> 
        </div>
    );
  }
}

NavigationListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavigationListItem);