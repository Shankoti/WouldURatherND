import "./App.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { SetAuthedUser } from "./actions/authedUser";
import { Link, Switch, withRouter } from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./components/Dashboard";
import AskNew from "./components/AskNew";
import { List, Header, Segment } from "semantic-ui-react";
import LeadrBoaed from "./components/LeadrBoard";
import Question from "./components/Question";
import Nav from "./components/Nav";

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
        <Switch>
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
                      onClick={() => this.props.dispatch(SetAuthedUser(user))}
                      key={user.id}
                    >
                      <Link
                        to={
                          this.props.location.state
                            ? this.props.location.state.from.pathname
                            : "/dashboard"
                        }
                      >
                        {user.name}
                      </Link>
                    </List.Item>
                  ))}
                </List>
              </div>
            )}
          />
          {this.props.authedUser ? (
            <Route exact path="/Dashboard" component={Dashboard} />
          ) : null}

          <Route exact path="/add" component={AskNew} />
          <Route exact path="/Leaderboard" component={LeadrBoaed} />
          <Route path="/questions/:id" component={Question} />
          <Route
            path="*"
            render={() => (
              <div>
                <Nav />
                <Segment placeholder textAlign="center">
                  <Header size="large">404</Header>
                  <Header size="large">PAGE NOT FOUND</Header>
                </Segment>
              </div>
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    usrs: Object.values(users),
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(withRouter(App));
