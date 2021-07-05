import React from 'react'
import { connect } from 'react-redux';

class Home extends React.Component{
   
    componentDidMount(){
    }
    
    render(){
      return(
        <div>
           首页
        </div>
      )
    }
}

const mapStateToProps = (store) =>{
  return  {...store}
}

export default connect(mapStateToProps)(Home)