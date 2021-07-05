import React from 'react';
import { connect } from 'react-redux';
import { increaseCount,decreaseCount } from '../../actions/admin'
import { go } from '../common/Go';

class AdminList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    componentDidMount(){
    }

    detail (id) {
        go(`/detail`)
    }

    render(){
        console.log(this.props);
        return(
            <div>
                 <div>{this.props.count}</div> 
                <button onClick={()=>{this.props.dispatch(increaseCount())}}>增加</button>
                <button onClick={()=>{this.props.dispatch(decreaseCount())}}>减少</button>
                <button onClick={this.detail.bind(this)} >详情A</button>
            </div>
        );
    }
}

const mapStateToProps = store => ({ count: store.admin });

export default connect(mapStateToProps)(AdminList)
