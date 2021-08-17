import React from "react";
import { NavLink } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import "./Nav.css";
import { LogOut } from "../actions/logOut";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/Dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/New">Ask a new question</NavLink>
          </li>
          <li>
            <NavLink to="/Leaderboard">Leaderboard</NavLink>
          </li>
          <li
            style={{ float: "right" }}
            onClick={() => this.props.dispatch(LogOut(null))}
          >
            <NavLink to="/">
              {this.props.authuser.name} is logged in, log out ?
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
function mapStateToProps({ authuser }) {
  return {
    authuser,
  };
}

export default connect(mapStateToProps)(Nav);
