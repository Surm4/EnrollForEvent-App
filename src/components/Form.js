import React, { Component } from 'react';
import ResponseMsg from './ResponseMsg';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'http://localhost:7000';

class Form extends Component {

  getColor = () => this.props.responseType ? "green" : "red";
  
  setColor = (color) => {
    this.props.dispatch({
      type: "SET_COLOR",
      color
    });
  }

  setMsg = (responseMsg, responseType) => {
    this.props.dispatch({
      type: "SET_MSG",
      responseMsg,
      responseType
    });
  };

  updateValue = (value, entity) => {
    this.props.dispatch({
      type: "UPDATE",
      value,
      entity
    });
  };

  clearInputs = () => {
    this.updateValue("", "firstName");
    this.updateValue("", "lastName");
    this.updateValue("", "email");
    this.updateValue("", "date");
  };

  submitData = (e) => {
    e.preventDefault();
    axios.post("/enroll", {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      date: this.props.date
    })
    .then(res => { 
      this.clearInputs();
      this.setMsg(res.data, true);
      this.setColor(this.getColor());
    })
    .catch(err => {
      err.response ? this.setMsg(err.response.data, false) : this.setMsg(err.toString(), false);
      this.setColor(this.getColor());
    });
  };

  render() {
    return (
      <div className="form-container"> 
        <div className="title-container">
          <div className="title">Enroll Event <small>app</small></div>
        </div>
        <form onSubmit={this.submitData.bind(this)}>
          <div className="input-container">
            <input className="firstname" onChange={e => this.updateValue(e.target.value, "firstName")} value={this.props.firstName} type="text" placeholder="First Name" maxLength="30" required/>
            <input className="lastname" onChange={e => this.updateValue(e.target.value, "lastName")} value={this.props.lastName} type="text" placeholder="Last  Name" maxLength="30" required/>
            <input className="email" onChange={e => this.updateValue(e.target.value, "email")} value={this.props.email} type="email" placeholder="Email" maxLength="30" required/>
            <input className="date" onChange={e => this.updateValue(e.target.value, "date")} value={this.props.date} type="date" maxLength="30" required/>
            <button type="submit">Send</button>
          </div>
          { this.props.responseMsg ? <ResponseMsg responseMsg={this.props.responseMsg} color={this.props.color}/> : null }
        </form>
      </div>
    );
  };
}

ResponseMsg.propTypes = {
  color: PropTypes.string,
  responseMsg: PropTypes.string,
  responseType: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  date: PropTypes.string
};

const mapStateToProps = (state) => ({
  color: state.color,
  responseMsg: state.responseMsg,
  responseType: state.responseType,
  firstName: state.firstName,
  lastName: state.lastName,
  email: state.email,
  date: state.date
});

export default connect(mapStateToProps)(Form);
