import ProjectService from "../services/ProjectService";
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Modals/ModalForm";
import DataTable from "./Tables/DataTable";

class Dashboard extends Component {
  state = {
    projects: [],
  };

  getprojects() {
    ProjectService.getProjects()
      .then((response) => {
        console.log(response);
        const projects = response.data.projects;
        this.setState({ projects });
      })
      .catch((err) => console.log(err));
  }

  addprojectToState = (project) => {
    this.setState((prevState) => ({
      projects: [...prevState.projects, project],
    }));
  };

  updateState = (project) => {
    const projectIndex = this.state.projects.findIndex(
      (data) => data.id === project.id
    );
    const newArray = [
      // destructure all projects from beginning to the indexed project
      ...this.state.projects.slice(0, projectIndex),
      // add the updated project to the array
      project,
      // add the rest of the projects to the array from the index after the replaced project
      ...this.state.projects.slice(projectIndex + 1),
    ];
    this.setState({ projects: newArray });
  };

  deleteprojectFromState = (id) => {
    const updatedprojects = this.state.projects.filter(
      (project) => project.id !== id
    );
    this.setState({ projects: updatedprojects });
  };

  componentDidMount() {
    this.getprojects();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Projects</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              projects={this.state.projects}
              updateState={this.updateState}
              deleteprojectFromState={this.deleteprojectFromState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm
              buttonLabel="Add Project"
              addprojectToState={this.addprojectToState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
