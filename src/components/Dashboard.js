import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { List, Container, Button, Card, Image } from "semantic-ui-react";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Nav />
        <div>
          <List>
            {this.props.qus.map((q) => (
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
                    <List.Item>{`asked by ${q.author}`}</List.Item>
                    <Button primary>{q.optionOne.text}</Button>
                    <Button secondary>{q.optionTwo.text}</Button>
                  </Card>
                </div>
              </Container>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    qus: Object.values(questions),
    urs: users,
  };
}

export default connect(mapStateToProps)(Dashboard);
