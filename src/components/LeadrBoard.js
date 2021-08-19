import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { Container, Grid, Image, Segment } from "semantic-ui-react";
class LeadrBoaed extends Component {
  state = {};
  render() {
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
                        <h1>{`Answerd qustions  ${user.questionsAnswerd}`}</h1>
                      </Grid.Column>
                      <Grid.Column>
                        <h1>{`Asked qustions  ${user.questionsAsked}`}</h1>
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
  }
}

function mapStateToProps({ users }) {
  return {
    usrs: Object.values(users),
  };
}

export default connect(mapStateToProps)(LeadrBoaed);
