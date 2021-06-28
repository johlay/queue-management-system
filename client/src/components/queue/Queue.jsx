import React from "react";
import Moment from "react-moment";
import socket from "../../modules/socket-client";
import config from "../../modules/config";

class Queue extends React.Component {
  state = {
    joined: false,
    queue: this.props.match.params.id,
    waitingList: null,
  };

  componentDidMount() {
    socket.emit(
      "join-queue",
      {
        queue: this.state.queue,
        access_token: config.getToken(),
      },
      (response) => {
        // Check "response.joined".
        if (!response.joined) {
          this.props.history.push("/");
        }

        // update current state with waitingList
        this.setState({
          joined: true,
          waitingList: response.waitingList,
        });
      }
    );

    // Listen for newly updated waiting list --> update state
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
    // Leave queue.
    socket.emit("leave-queue", this.state.queue);

    // Cancel listeners for updated waiting list - so we no longer listen for updated waiting list (when user/client is no longer in room.)
    socket.off("updated-waiting-list");
  }

  render() {
    return (
      <div className="component-Queue">
        {this.state.joined ? (
          <>
            <div className="text-center">
              <h1>{this.state.queue}</h1>
              <p className="lead">Waiting list</p>
            </div>

            <ol className="list-group">
              {this.state.waitingList.map((user, index) => {
                return (
                  <li
                    className="list-group-item"
                    title={user.location}
                    key={index}
                  >
                    {++index}.<span className="fw-bold">{user.name}</span>
                    <span className="px-1">
                      <Moment date={user.waitingSince} format="HH:mm" unix />
                    </span>
                    <span className="px-1">
                      {" "}
                      joined: <Moment date={user.waitingSince} fromNow unix />
                    </span>
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
