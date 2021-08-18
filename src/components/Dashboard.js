import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { List, Container, Button, Card, Image } from "semantic-ui-react";
import { Tab } from "semantic-ui-react";

class Dashboard extends Component {
  state = {};
  render() {
    const panes = [
      {
        menuItem: "Unanswered",
        render: () => (
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
                    <p
                      style={{ color: "green", fontSize: 16 }}
                    >{`Would you rather....`}</p>

                    <Button onClick={() => console.log("Clicked")}>
                      {q.optionOne.text}
                    </Button>
                    <Button primary>{q.optionTwo.text}</Button>
                  </Card>
                </div>
              </Container>
            ))}
          </List>
        ),
      },
      {
        menuItem: "Answered",
        render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
      },
    ];
    return (
      <div>
        <Nav />
        <div>
          <Tab panes={panes} />
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
