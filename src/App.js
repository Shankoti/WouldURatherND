import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { SetAuthUser } from "./actions/authuser";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./components/Dashboard";

//making this function a react component so i can use componentDidMount()
//git push -u origin main

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  state = {};
  render() {
    console.log(this.props);
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="vertical-menu">
              <ul>
                Select
                {this.props.usrs.map((user) => (
                  <li
                    onClick={() => this.props.dispatch(SetAuthUser(user))}
                    key={user.id}
                  >
                    <Link to="/Dashboard">{user.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        />
        <Route exact path="/Dashboard" component={Dashboard} />
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    usrs: Object.values(users),
  };
}

export default connect(mapStateToProps)(App);
