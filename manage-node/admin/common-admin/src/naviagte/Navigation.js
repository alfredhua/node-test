import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuData from './MenuData';
import {NavigationStyle} from './css/NavigationStyle';

class Navigation extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme,menu } = this.props;
    return (
      <div className={classes.root}>
         <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
               {menu} 
            </Typography>
          </Toolbar>
        </AppBar> 

        <Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),}} open={this.state.open}>
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
             <List>
               <MenuData></MenuData>
             </List>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar}/>
              {this.props.children}
        </main>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(NavigationStyle, { withTheme: true })(Navigation);