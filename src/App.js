import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { SetAuthUser } from "./actions/authuser";

//making this function a react component so i can use componentDidMount()

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  state = {};
  render() {
    console.log(this.props);
    return (
      <div className="vertical-menu">
        <ul>
          Select
          {this.props.usrs.map((user) => (
            <li
              onClick={() => this.props.dispatch(SetAuthUser(user))}
              key={user.id}
            >
              <a>{user.name}</a>
            </li>
          ))}
        </ul>
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
