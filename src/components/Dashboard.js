import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import {
  List,
  Container,
  Button,
  Card,
  Image,
  Header,
  Grid,
  Segment,
} from "semantic-ui-react";
import { Tab } from "semantic-ui-react";
import { Redirect } from "react-router";
import { Link, withRouter } from "react-router-dom";

class Dashboard extends Component {
  state = {};
  render() {
    console.log(this.props);
    if (this.props.athusr.id) {
      const answerd = Object.keys(this.props.urs[this.props.athusr.id].answers);
      answerd.map((a) => console.log("answers", a));

      const panes = [
        {
          menuItem: "Unanswered",
          render: () => (
            <List>
              {this.props.qus.reverse().map((q) =>
                answerd.includes(q.id) ? null : (
                  <Container textAlign={"center"} key={q.id}>
                    <Segment raised>
                      <Grid divided="vertically">
                        <Grid.Row columns="2">
                          <Grid.Column>
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
                          </Grid.Column>
                          <Grid.Column>
                            <Grid.Row verticalAlign="bottom" columns="1">
                              <Grid.Column textAlign="center">
                                <p
                                  style={{ color: "green", fontSize: 16 }}
                                >{`Would you rather....`}</p>
                                <Header>{q.optionOne.text}</Header>
                                <Header>{q.optionTwo.text}</Header>
                                <Link to={`/questions/${q.id}`}>
                                  <Button primary>Answer question</Button>
                                </Link>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
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
              {this.props.qus.reverse().map((q) =>
                answerd.includes(q.id) ? (
                  <Container textAlign={"center"} key={q.id}>
                    <Segment raised>
                      <Grid divided="vertically">
                        <Grid.Row columns="2">
                          <Grid.Column width="4">
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
                          </Grid.Column>
                          <Grid.Column>
                            <p
                              style={{ color: "green", fontSize: 16 }}
                            >{`Would you rather....`}</p>
                            <p>{q.optionOne.text}</p>
                            <p>or {q.optionTwo.text}</p>

                            {this.props.urs[this.props.athusr.id].answers[
                              q.id
                            ] === "optionTwo" ? (
                              <Header style={{ padding: 20 }}>
                                Your answer is
                                <Header color="green">{`${q.optionTwo.text}`}</Header>
                              </Header>
                            ) : (
                              <Header style={{ padding: 20 }}>
                                Your answer is
                                <Header color="green">{`${q.optionOne.text}`}</Header>
                              </Header>
                            )}
                            <Link to={`/questions/${q.id}`}>
                              <Button primary>Statistics </Button>
                            </Link>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
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
      return (
        <Redirect
          to={{ pathname: "/", state: { from: this.props.location } }}
        />
      );
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

export default connect(mapStateToProps)(withRouter(Dashboard));
