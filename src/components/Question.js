import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Image,
  Segment,
  Button,
  Progress,
  Header,
} from "semantic-ui-react";
import Nav from "./Nav";
import { handleQanswer } from "../actions/users";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

class Question extends Component {
  state = { vis: false };

  render() {
    if (this.props.athusr.id) {
      if (this.props.Id !== "undefined") {
        const { Id, QUS, urs } = this.props;
        const theQuestion = QUS[Id];
        if (!theQuestion) {
          return <Redirect to="/404" />;
        }
        const author = urs[QUS[Id].author];
        const answerd = Object.keys(
          this.props.urs[this.props.athusr.id].answers
        );

        return (
          <div>
            <Nav />
            <Container>
              <Segment raised>
                <Grid divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column width="5">
                      <Image src={author.avatarURL} width="170" height="170" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" verticalAlign="middle">
                      <Grid.Row columns={1}>
                        <Grid.Column>
                          <h1>{`Asked by ${author.name} `}</h1>
                        </Grid.Column>

                        <Grid.Column>
                          {this.state.vis ||
                          answerd.includes(theQuestion.id) ? (
                            <h1>
                              {`${theQuestion.optionOne.votes.length} of ${
                                theQuestion.optionOne.votes.length +
                                theQuestion.optionTwo.votes.length
                              } Picked to `}
                              {theQuestion.optionOne.text}

                              <Progress
                                percent={
                                  (theQuestion.optionOne.votes.length /
                                    (theQuestion.optionOne.votes.length +
                                      theQuestion.optionTwo.votes.length)) *
                                  100
                                }
                                progress
                              />
                            </h1>
                          ) : (
                            <Button
                              onClick={() => {
                                this.setState({ vis: true });

                                this.props.dispatch(
                                  handleQanswer(
                                    this.props.athusr.id,
                                    theQuestion.id,
                                    "optionOne"
                                  )
                                );
                              }}
                              primary
                            >{`${theQuestion.optionOne.text} `}</Button>
                          )}
                          {this.state.vis ||
                          answerd.includes(theQuestion.id) ? (
                            <h1>
                              {`${theQuestion.optionTwo.votes.length} of ${
                                theQuestion.optionOne.votes.length +
                                theQuestion.optionTwo.votes.length
                              } Picked `}
                              {theQuestion.optionTwo.text}

                              <Progress
                                percent={
                                  (theQuestion.optionTwo.votes.length /
                                    (theQuestion.optionOne.votes.length +
                                      theQuestion.optionTwo.votes.length)) *
                                  100
                                }
                                progress
                              />
                              {this.props.urs[this.props.athusr.id].answers[
                                theQuestion.id
                              ] === "optionTwo" ? (
                                <Header style={{ padding: 20 }}>
                                  Your answer is
                                  <Header color="green">{`${theQuestion.optionTwo.text}`}</Header>
                                </Header>
                              ) : (
                                <Header style={{ padding: 20 }}>
                                  Your answer is
                                  <Header color="green">{`${theQuestion.optionOne.text}`}</Header>
                                </Header>
                              )}
                            </h1>
                          ) : (
                            <Button
                              onClick={() => {
                                this.setState({ vis: true });
                                this.props.dispatch(
                                  handleQanswer(
                                    this.props.athusr.id,
                                    theQuestion.id,
                                    "optionTwo"
                                  )
                                );
                              }}
                            >
                              {`${theQuestion.optionTwo.text} `}
                            </Button>
                          )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
          </div>
        );
      } else {
        return (
          <div>
            <Nav />
            <Segment placeholder textAlign="center">
              <Header size="large">404</Header>
              <Header size="large">PAGE NOT FOUND</Header>
            </Segment>
          </div>
        );
      }
    } else {
      return (
        <Redirect
          to={{ pathname: "/", state: { from: this.props.location } }}
        />
      );
    }
  }
}
function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;

  return {
    Id: id,
    qus: Object.values(questions),
    QUS: questions,
    urs: users,
    athusr: authedUser,
  };
}

export default connect(mapStateToProps)(withRouter(Question));
