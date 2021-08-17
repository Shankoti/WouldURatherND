import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { SetAuthUser } from "./actions/authuser";
import { Link } from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./components/Dashboard";
import { List, Header } from "semantic-ui-react";

//git push -u origin main

//making this function a react component so i can use componentDidMount()

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
              <List divided relaxed>
                <Header as="h2" icon textAlign="center">
                  <Header.Content>Select</Header.Content>
                </Header>
                {this.props.usrs.map((user) => (
                  <List.Item
                    onClick={() => this.props.dispatch(SetAuthUser(user))}
                    key={user.id}
                  >
                    <Link to="/Dashboard">{user.name}</Link>
                  </List.Item>
                ))}
              </List>
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
