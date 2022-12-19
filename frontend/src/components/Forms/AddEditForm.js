import ProjectService from "../../services/ProjectService";
import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    id: 0,
    username: "",
    title: "",
    zip_code: "",
    cost: "",
    done: "",
    deadline: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();

    const response = ProjectService.createProject({
      username: this.state.username,
      title: this.state.title,
      zip_code: this.state.zip_code,
      cost: this.state.cost,
      done: this.state.done,
      deadline: this.state.deadline,
    });
  };

  submitFormEdit = (e) => {
    const id = this.state.id;
    e.preventDefault();
    fetch(`http://localhost:8000/api/projects/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        username: this.state.username,
        title: this.state.title,
        zip_code: this.state.zip_code,
        cost: this.state.cost,
        done: this.state.done,
        deadline: this.state.deadline,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { id, username, title, zip_code, cost, done, deadline } =
        this.props.item;
      this.setState({ id, username, title, zip_code, cost, done, deadline });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            onChange={this.onChange}
            value={this.state.username === null ? "" : this.state.username}
          />
        </FormGroup>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={this.onChange}
            value={this.state.title === null ? "" : this.state.title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="zip_code">Zip Code</Label>
          <Input
            type="zip_code"
            name="zip_code"
            id="zip_code"
            onChange={this.onChange}
            value={this.state.zip_code === null ? "" : this.state.zip_code}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cost">Cost</Label>
          <Input
            type="text"
            name="cost"
            id="cost"
            onChange={this.onChange}
            value={this.state.cost === null ? "" : this.state.cost}
          />
        </FormGroup>
        <FormGroup>
          <Label for="done">done</Label>
          <Input
            type="text"
            name="done"
            id="done"
            onChange={this.onChange}
            value={this.state.done === null ? "" : this.state.done}
            placeholder="False"
          />
        </FormGroup>
        <FormGroup>
          <Label for="deadline">deadline</Label>
          <Input
            type="datetime-local"
            name="deadline"
            id="deadline"
            onChange={this.onChange}
            value={this.state.deadline}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
