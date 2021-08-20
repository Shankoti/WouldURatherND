import React, { Component } from "react";
import Nav from "./Nav";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { handleaddQustion } from "../actions/questions";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

class AskNew extends Component {
  state = {
    OpOne: "",
    OpTwo: "",
    submitDone: false,
  };
  handleChangeOpOne = (e) => {
    const OpOne = e.target.value;

    this.setState(() => ({
      OpOne,
    }));
  };

  handleChangeOpTwo = (e) => {
    const OpTwo = e.target.value;

    this.setState(() => ({
      OpTwo,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { OpOne, OpTwo } = this.state;
    const { id } = this.props.authedUser;

    // todo: Add Tweet to Store

    console.log("Option One ", OpOne);
    console.log("Option two ", OpTwo);
    console.log(id);

    this.props.dispatch(handleaddQustion(OpOne, OpTwo, id));
    this.setState(() => ({
      OpOne: "",
      OpTwo: "",
    }));
    this.setState({ submitDone: true });
  };
  render() {
    if (this.props.authedUser.id) {
      const { OpOne, OpTwo } = this.state;
      if (this.state.submitDone) {
        return <Redirect to="/Dashboard" />;
      } else {
        return (
          <div>
            <Nav />
            <div style={{ padding: 100 }}>
              <Form style={{ padding: 100 }} onSubmit={this.handleSubmit}>
                <Form.Field style={{ paddingLeft: 200, paddingRight: 200 }}>
                  <label>Would you rather..</label>
                  <input
                    onChange={this.handleChangeOpOne}
                    value={OpOne}
                    placeholder="Option one"
                  />
                </Form.Field>
                <Form.Field style={{ paddingLeft: 200, paddingRight: 200 }}>
                  <label>or..</label>
                  <input
                    onChange={this.handleChangeOpTwo}
                    value={OpTwo}
                    placeholder="Option two"
                  />
                </Form.Field>

                <Button
                  disabled={OpTwo === "" || OpOne === ""}
                  style={{ marginLeft: 200 }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
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
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(withRouter(AskNew));
