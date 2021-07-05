import React from 'react';
import { connect } from 'react-redux';

class AdminDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    componentDidMount(){

    }

    render(){
        const {index}=this.props;
        console.log(this.props);
        return(
            <div>
                 详情AAAA
            </div>
        );
    }
}

export default connect()(AdminDetail)
