import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import logo from './images/iss.png';
import './App.css';
import axios from 'axios'
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">When to spot the International Space Station</h1>
        <h3 className="App-title">Now with Redux!</h3>
      </header>
    );
  }
}

let IssApiForm = props => {
  const { handleSubmit } = props;



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Latitude:
        <Field
          name="latitude"
          component="input"
          type="number"
          step="0.00001"
          min="0"
          max="90"
        />
      </label>
      <br />
      <label>
        Longitude:
        <Field
          name="longitude"
          component="input"
          type="number"
          step="0.00001"
          min="-180"
          max="180"
        />
      </label>
      <br />
      <label>
        Number of passovers:
        <Field
          name="number"
          component="input"
          type="number"
          step="1"
          min="0"
          max="100"
        />
      </label>
      <br />
      <button className="button">Submit</button>
  </form>
  );
}

IssApiForm = reduxForm({
  form: 'issapi',
})(IssApiForm);

class App extends Component {
  handleSubmit = values => {
    console.log("The form was submitted");
    axios.get(
      "http://api.open-notify.org/iss-pass.json?lat=" +
      values.latitude.toString() +
      "&lon=" +
      values.longitude.toString() +
      "&n=" +
      values.number.toString()
      )
      .then(response => {
        console.log(response.data.response);
        // this.props.dispatch({
        //   type: 'RESPONSE',
        //   'flybys': response.data.response
        // });
      })
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <p className="App-intro">
            ISS API Form
          </p>
          <IssApiForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
return ({
    flybys: state.flybys
  });
}

export default connect(mapStateToProps)(App);
