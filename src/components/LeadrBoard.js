import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { Container, Grid, Image, Segment } from "semantic-ui-react";
import { Redirect, withRouter } from "react-router-dom";
class LeadrBoaed extends Component {
  state = {};
  render() {
    if (this.props.athusr.id) {
      const RankedUsers = this.props.usrs
        .map((user) => ({
          name: user.name,
          id: user.id,
          avatarURL: user.avatarURL,
          questionsAnswerd: Object.values(user.answers).length,
          questionsAsked: user.questions.length,
          totalQuestions:
            Object.values(user.answers).length + user.questions.length,
        }))
        .sort((a, b) => b.totalQuestions - a.totalQuestions);

      console.log(RankedUsers);
      return (
        <div>
          <Nav />
          {RankedUsers.map((user) => (
            <Container key={user.id}>
              <Segment raised>
                <Grid divided="vertically">
                  <Grid.Row columns={2}>
                    <Grid.Column width="4">
                      <Image src={user.avatarURL} width="170" height="170" />
                    </Grid.Column>
                    <Grid.Column textAlign="left" verticalAlign="middle">
                      <Grid.Row columns={1}>
                        <Grid.Column>
                          <h1>{`${user.name}`}</h1>
                        </Grid.Column>
                        <Grid.Column>
                          <h1>{`Answerd questions  ${user.questionsAnswerd}`}</h1>
                        </Grid.Column>
                        <Grid.Column>
                          <h1>{`Asked questions  ${user.questionsAsked}`}</h1>
                        </Grid.Column>
                        <Grid.Column>
                          <h1>{`Points  ${user.totalQuestions}`}</h1>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Container>
          ))}
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

function mapStateToProps({ users, authedUser }) {
  return {
    usrs: Object.values(users),
    athusr: authedUser,
  };
}

export default connect(mapStateToProps)(withRouter(LeadrBoaed));
