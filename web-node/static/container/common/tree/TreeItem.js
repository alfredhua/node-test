import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TreeStyle from './css/TreeStyle';


const left=20;

let children_key=[];
let current_node;

class TreeItem extends React.Component{
  constructor(props) {
    super(props)
    this.state = { 
      checked: this.props.checked||[],
      open:[],
      root_open:true,
      all_checked_node:props.all_checked_node||[]
     };

  }

  componentWillMount(nextProp){
    let {on_select}=this.props;
    let {all_checked_node} =this.state;
    on_select(all_checked_node);
  }

  handle_click(index) {
    this.setState(state => ({ open: !state.open }));
  };

  change_checked(key){
   let {all_checked_node} =this.state;
   children_key=[];
   let {checked}= this.state;
   let current_node=this.get_current_node(key);
   if(checked[current_node.key]){
     checked[current_node.key]=false;
   }else{
     checked[current_node.key]=true;
   }

   let all_children_key=this.get_all_children_key(current_node);
   if(all_children_key){
    all_children_key.map((children_key)=>{
      checked[children_key]=checked[current_node.key];
    });
   }
   for(var i=0;i<all_checked_node.length;i++){
    if(checked[all_checked_node[i].key]){
    }else{
      all_checked_node.splice(i,1);
      i--;
    }
   }
   let {on_select}=this.props;
   on_select(all_checked_node);
   this.setState({checked,all_checked_node});
  }

  /**
   * 获取当前节点的key和它所有孩子的节点的key，
   * @param {当前节点} current_node 
   */
  get_all_children_key(current_node){
    let {all_checked_node} =this.state;
    children_key.push(current_node.key);
    let flag=false;
    for(var i=0;i<all_checked_node.length;i++){
      if(all_checked_node[i].key==current_node.key){
        flag=true;
        break;
      }
    }
    if(!flag){
      all_checked_node.push(current_node);
    }
    if(current_node.childNodes){
      current_node.childNodes.map((childnode)=>{
          this.get_all_children_key(childnode);
      });
     }
     return children_key;
  }

  /**
   * 获取当前节点
   * @param {当前节点的key}} current_key 
   */
  get_current_node(current_key){
    let node={};
    const {data} =this.props;
    if(data.key==current_key){
      return data;
    }
    if(data.childNodes){
      for(var i=0;i<data.childNodes.length;i++){
        if(data.childNodes[i].key==current_key){
          node=data.childNodes[i];
          break;
        }else{
          node=this.get_node(data.childNodes[i],current_key);
        }
      }
    }
    return node;
  }

  get_node(node,current_key){
    if(node.key==current_key){
         current_node=node;
         return
    }
    if(node.childNodes){
      for(var i=0;i<node.childNodes.length;i++){
        if(node.childNodes[i].key==current_key){
          current_node=node.childNodes[i];
          break;
        }else{
          this.get_node(node.childNodes[i],current_key);
        }
      }
    }
    return current_node;
  }
  handle_click(key){
    let {open}=this.state;
    if(open[key]){
      open[key]=false;
    }else{
      open[key]=true;
    }
   
    this.setState({open});
  }
  handle_root_click=()=>{
    this.setState(root_open => ({ root_open: !this.state.root_open }));
  }
  getItem(node,index,node_dep){
    if(!index){
      index=1;
    }
    return(
        <div style={{position:"relative"}}>
         <input type="checkbox" style={{zIndex:"10",position:"absolute",top:"5px",left:`calc(${(index+node_dep-1)*left-10}px)`}} checked={this.state.checked[node.key]?true:false} onClick={()=>{this.change_checked(node.key)}}/>
        <ListItem  style={{marginLeft:`calc(${(index+node_dep-1)*left}px)`,paddingTop:"5px",paddingBottom:"5px"}} key={node.key}  dense button onClick={()=>{this.handle_click(node.key)}} > 
              <ListItemText style={{marginLeft:"-15px"}} primary={`${node.title}`} />
        </ListItem>
        <Collapse in={this.state.open[node.key]?false:true}  timeout="auto" unmountOnExit>
          <List disablePadding >
            {node.childNodes&&node.childNodes.map((childnode,index)=>(
              <div key={childnode.key}>
                {this.getItem(childnode,index,node_dep+1)}
              </div>
            ))}
          </List>
      </Collapse>
    </div>
    );
  }

  render(){
    const { classes,data } = this.props;
    return(
      <div style={this.props.style}>
        <div className={classes.root} style={{position:"relative"}}>
              <List>
                 <input type="checkbox" style={{zIndex:"10",position:"absolute",top:"13px"}} checked={this.state.checked[data.key]?true:false} onClick={()=>{this.change_checked(data.key)}}/>
                  <ListItem style={{paddingTop:"5px",paddingBottom:"5px"}} key={data.key}  dense  button onClick={this.handle_root_click.bind(this)} > 
                     <ListItemText  primary={`${data.title}`} />
                  </ListItem>
                  <Collapse in={this.state.root_open}  timeout="auto" unmountOnExit>
                      <List>
                      {data.childNodes&&data.childNodes.map((childnode,index) => (
                        <div key={childnode.key}>
                          {this.getItem(childnode,index,1)}
                        </div>
                      ))}
                      </List> 
                   </Collapse>
              </List> 
        </div>
        <div className={classes.root_right}>
               <List>
                  {this.state.all_checked_node&&this.state.all_checked_node.map((checked_node,index) => (
                       <ListItem  key={checked_node.key}  dense > 
                            <ListItemText primary={`${checked_node.title} :`+`  ${checked_node.href}`} />
                       </ListItem>
                  ))}
              </List> 
          </div>
          <div style={{clear:"both"}}></div>
        </div>
    );
  }
}

TreeItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(TreeStyle)(TreeItem);