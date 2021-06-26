import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Navigation from "./components/navigation/Navigation";
import NotFound from "./components/notfound/NotFound";
import Room from "./components/room/Room";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <main role="main" className="container my-3">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/room/:id" component={Room} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
