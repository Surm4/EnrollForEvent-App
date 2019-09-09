import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResponseMsg extends Component {
    render() {
        return (
            <div className="response-msg" style={{color: this.props.color}}>
                {this.props.responseMsg}
            </div>
        );
    }
}

ResponseMsg.propTypes = {
    color: PropTypes.string,
    responseMsg: PropTypes.string
};

export default ResponseMsg;