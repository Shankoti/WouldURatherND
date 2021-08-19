import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { List, Container, Button, Card, Image } from "semantic-ui-react";
import { Tab } from "semantic-ui-react";
import { AddAnswer } from "../actions/users";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  state = {};
  render() {
    if (this.props.athusr.id) {
      const answerd = Object.keys(this.props.urs[this.props.athusr.id].answers);
      answerd.map((a) => console.log("answers", a));

      const panes = [
        {
          menuItem: "Unanswered",
          render: () => (
            <List>
              {this.props.qus.map((q) =>
                answerd.includes(q.id) ? null : (
                  <Container textAlign={"center"} key={q.id}>
                    <div style={{ padding: 10, float: "left" }}>
                      <Card>
                        <Card>
                          <Image
                            src={this.props.urs[q.author].avatarURL}
                            wrapped
                            ui={false}
                          />
                          <Card.Content>
                            <Card.Header>
                              {this.props.urs[q.author].name}
                            </Card.Header>
                          </Card.Content>
                        </Card>
                        <p
                          style={{ color: "green", fontSize: 16 }}
                        >{`Would you rather....`}</p>
                        <Button
                          onClick={() =>
                            this.props.dispatch(
                              AddAnswer(this.props.athusr.id, q.id, "optionOne")
                            )
                          }
                        >
                          {q.optionOne.text}
                        </Button>
                        <Button
                          onClick={() =>
                            this.props.dispatch(
                              AddAnswer(this.props.athusr.id, q.id, "optionTwo")
                            )
                          }
                          primary
                        >
                          {q.optionTwo.text}
                        </Button>
                        <Link to={`/question/${q.id}`}>
                          <Button primary></Button>
                        </Link>
                      </Card>
                    </div>
                  </Container>
                )
              )}
            </List>
          ),
        },
        {
          menuItem: "Answered",
          render: () => (
            <List>
              {this.props.qus.map((q) =>
                answerd.includes(q.id) ? (
                  <Container textAlign={"center"} key={q.id}>
                    <div style={{ padding: 10, float: "left" }}>
                      <Card>
                        <Card>
                          <Image
                            src={this.props.urs[q.author].avatarURL}
                            wrapped
                            ui={false}
                          />
                          <Card.Content>
                            <Card.Header>
                              {this.props.urs[q.author].name}
                            </Card.Header>
                          </Card.Content>
                        </Card>
                        <p
                          style={{ color: "green", fontSize: 16 }}
                        >{`Would you rather....`}</p>
                        <h1>
                          {this.props.urs[this.props.athusr.id].answers[
                            q.id
                          ] === "optionTwo"
                            ? q.optionTwo.text
                            : q.optionOne.text}
                        </h1>
                        <Button
                          disabled
                          color="green"
                          onClick={() =>
                            this.props.dispatch(
                              AddAnswer(this.props.athusr.id, q.id, "optionOne")
                            )
                          }
                        >
                          {q.optionOne.text}
                        </Button>
                        <Button
                          onClick={() =>
                            this.props.dispatch(
                              AddAnswer(this.props.athusr.id, q.id, "optionTwo")
                            )
                          }
                          primary
                        >
                          {q.optionTwo.text}
                        </Button>
                      </Card>
                    </div>
                  </Container>
                ) : null
              )}
            </List>
          ),
        },
      ];

      return (
        <div>
          <Nav />
          <Tab panes={panes} />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    qus: Object.values(questions),
    urs: users,
    athusr: authedUser,
  };
}

export default connect(mapStateToProps)(Dashboard);
