import React from "react";
import socket from "../../modules/socket-client";

class Login extends React.Component {
  state = {
    name: "",
    location: "",
    queue: "queue1",
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleOnSubmit = (e) => {
    // Prevent default action.
    e.preventDefault();

    // Log - delete this.
    console.log(
      "Emitting 'join-queue' to Socket.IO-server with the following payload:",
      this.state
    );

    // Emits a "payload" when user/client join room.
    socket.emit("join-queue", this.state, (status) => {
      console.log(
        "Got response to 'join-queue' event from the server:",
        status
      );

      this.props.history.push(`/queue/${status.queue}`);
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
            <label htmlFor="name">Name</label>
            <input
              autoComplete="false"
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
              autoComplete="false"
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
              id="queue"
              className="form-control"
              onChange={this.handleOnChange}
            >
              <option value="queue1">Queue 1</option>
              <option value="queue2">Queue 2</option>
              <option value="queue3">Queue 3</option>
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
