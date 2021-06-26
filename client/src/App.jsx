import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import NotFound from "./components/notfound/NotFound";
import Queue from "./components/queue/Queue";
import socket from "./modules/socket-client";
import "./App.scss";

class App extends React.Component {
  state = {
    queue: null,
    waitingList: null,
  };

  componentDidMount() {}

  componentWillUnmount() {
    console.log("Is now disconnecting from socket-server...");
    socket.removeAllListeners(); // Remove all socket.on if used in other components which do not have "unMount" life cycle which "cleans up".
    socket.disconnect();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <main role="main" className="container my-3">
            <Switch>
              <Route exact path="/" component={Login} />
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
