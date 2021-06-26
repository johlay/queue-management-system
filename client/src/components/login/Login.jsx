import React from "react";
import socket from "../../modules/socket-client";

class Login extends React.Component {
  state = {
    name: "",
    location: "",
    channel: "Channel1",
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleOnSubmit = (e) => {
    // Prevent default action.
    e.preventDefault();

    // Emits a "payload" when user/client join room.
    socket.emit("join-room", this.state);
  };
  render() {
    return (
      <div className="component-Login">
        <div className="text-center">
          <h1>QMS</h1>
          <p className="lead mb-5">Please login!</p>
        </div>

        <form id="login-form" onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              onChange={this.handleOnChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              className="form-control"
              onChange={this.handleOnChange}
              placeholder="Enter your location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="channel">Channel</label>
            <select
              id="channel"
              className="form-control"
              onChange={this.handleOnChange}
            >
              <option value="Channel1">Channel1</option>
              <option value="Channel2">Channel2</option>
              <option value="Channel3">Channel3</option>
            </select>
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
