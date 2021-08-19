import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Grid, Image, Segment, Button } from "semantic-ui-react";
import Nav from "./Nav";
import { AddAnswer } from "../actions/users";
import { AddAnswerQ } from "../actions/questions";
import { handleQanswer } from "../actions/users";
class Question extends Component {
  state = {};

  render() {
    const { Id, qus, QUS, urs } = this.props;
    console.log(QUS[Id]);
    console.log(urs[QUS[Id].author].avatarURL);
    const theQuestion = QUS[Id];
    const author = urs[QUS[Id].author];

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
                      <Button
                        onClick={() =>
                          this.props.dispatch(
                            handleQanswer(
                              this.props.athusr.id,
                              theQuestion.id,
                              "optionOne"
                            )
                          )
                        }
                        primary
                      >{`${theQuestion.optionOne.text} `}</Button>
                      <Button
                        onClick={() =>
                          this.props.dispatch(
                            handleQanswer(
                              this.props.athusr.id,
                              theQuestion.id,
                              "optionTwo"
                            )
                          )
                        }
                      >{`${theQuestion.optionTwo.text} `}</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
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

export default connect(mapStateToProps)(Question);
