import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleOnSubmit = (e) => {
    // Prevent default action.
    e.preventDefault();

    // Log - delete this.
    console.log("Authenticating with:", this.state);

    axios
      .post("http://localhost:3001/login", this.state)
      .then((res) => {
        console.log("Received response from login:", res.data);
        const token = res.data.data.access_token;

        // Using props(handler) from App.js.
        this.props.onLogin(token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="component-Login">
        <div className="text-center">
          <h1>QMS</h1>
          <p className="lead mb-5">Please login!</p>
        </div>

        <form autoComplete="off" id="login-form" onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="naemailme">Email</label>
            <input
              autoComplete="false"
              type="email"
              id="email"
              className="form-control"
              onChange={this.handleOnChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="false"
              type="password"
              id="password"
              className="form-control"
              onChange={this.handleOnChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
