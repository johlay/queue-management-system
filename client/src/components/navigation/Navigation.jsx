import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            QMS - Start
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/room/qms" className="nav-link">
                  Room: qms
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default withRouter(Navigation);
