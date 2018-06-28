import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import logo from './images/iss.png';
import './App.css';
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


class FlybyRows extends Component {
  s_to_min = function(seconds) {
    // takes number of seconds in string form
    // converts to minutes and rounds to nearest whole number
    // returns minutes in string form
    const s = parseInt(seconds);
    const m = Math.round(s / 60);
    return m.toString();
  }

  ms_convert = function(milliseconds, type) {
    const ms = parseInt(milliseconds);
    const date = new Date(ms * 1000);
    switch(type) {
      case 'date':
        return date.toLocaleDateString();
      case 'time':
        return date.toLocaleTimeString();
      default:
        return ''
    }
  }

  render() {
    const flybys = this.props.flybys;
    const flybyRows = flybys.map((flyby) =>
      <tr key={flyby.risetime.toString()}>
        <td>{this.ms_convert(flyby.risetime, 'date')}</td>
        <td>{this.ms_convert(flyby.risetime, 'time')}</td>
        <td>{this.s_to_min(flyby.duration)}</td>
      </tr>
    );
    return (
      <tbody>
        {flybyRows}
      </tbody>
    );
  }
}


class FlybyTable extends Component {
  render() {
    if (this.props.flybys !== '') {
      return (
        <table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Rise Time</th>
            <th>Duration (minutes)</th>
          </tr>
          </thead>
          <FlybyRows flybys={this.props.flybys}/>
        </table>
      );
    } else {
      return null
    }
  }
}

class App extends Component {
  handleSubmit = values => {
    console.log("The form was submitted");
    this.props.dispatch({
      type: 'QUERY',
      values: values
    });
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
          <FlybyTable flybys={this.props.flybys}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
return ({
    flybys: state.api.flybys
  });
}

export default connect(mapStateToProps)(App);
