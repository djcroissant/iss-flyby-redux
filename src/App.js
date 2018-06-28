import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import logo from './images/iss.png';
import './App.css';


let IssApiForm = props => {
  const { handleSubmit } = props;

  return <form onSubmit={handleSubmit} className="form">

    <div className="field">
      <div className="control">
        <label className="label">First Name</label>
        <Field className="input" name="firstName" component="input" type="text" placeholder="First Name"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <button className="button is-link">Submit</button>
      </div>
    </div>

  </form>
}

IssApiForm = reduxForm({
  form: 'issapi',
})(IssApiForm);

class App extends Component {
  handleSignIn = values => {
    console.log(values);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <p className="App-intro">
            ISS API Form
          </p>
          <IssApiForm onSubmit={this.handleSignIn} />
        </div>
      </div>
    );
  }
}

export default App;
