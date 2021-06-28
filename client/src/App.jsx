import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import NotFound from "./components/notfound/NotFound";
import Queue from "./components/queue/Queue";
import QueueList from "./components/queue/QueueList";
import socket from "./modules/socket-client";
import "./App.scss";

class App extends React.Component {
  state = {
    token: false,
  };

  componentDidMount() {}

  componentWillUnmount() {
    console.log("Is now disconnecting from socket-server...");
    socket.removeAllListeners(); // Remove all socket.on if used in other components which do not have "unMount" life cycle which "cleans up".
    socket.disconnect();
  }

  handleOnLogin = (token) => {
    console.log("Setting token in App state", token);

    this.setState({ token: token });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <main role="main" className="container my-3">
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Login onLogin={this.handleOnLogin} />}
              />
              <Route path="/queue" component={QueueList} />
              <Route path="/queue/:id" component={Queue} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
