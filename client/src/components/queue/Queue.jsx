import React from "react";
import socket from "../../modules/socket-client";

class Queue extends React.Component {
  state = {
    queue: null,
    waitingList: null,
  };

  componentDidMount() {
    socket.emit("get-waiting-list", this.props.match.params.id, (response) => {
      console.log(
        "Got response for 'get-waiting-list' event from server:",
        response
      );

      // update state
      this.setState({
        queue: response.queue,
        waitingList: response.waitingList,
      });
    });

    // Listen for waiting list --> update state
    socket.on("updated-waiting-list", (data) => {
      console.log("Got updated waiting list from server:", data);

      // update state
      this.setState({
        queue: data.room,
        waitingList: data.waitingList,
      });
    });
  }

  componentWillUnmount() {
    // Cancel listeners for updated waiting list - so we no longer listen for updated waiting list (when user/client is no longer in room.)
    socket.off("updated-waiting-list");
  }

  render() {
    return (
      <div className="component-Queue">
        {this.state.queue ? (
          <>
            <h1>{this.state.queue}</h1>
            <p className="lead">Waiting list</p>

            <ol className="list-group">
              {this.state.waitingList.map((user, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    {user.name}
                  </li>
                );
              })}
            </ol>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
  }
}

export default Queue;
