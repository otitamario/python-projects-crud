import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/ModalForm";

class DataTable extends Component {
  deleteproject = (id) => {
    let confirmDelete = window.confirm("Delete project forever?");
    if (confirmDelete) {
      fetch(`http://localhost:8000/api/projects/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((project) => {
          this.props.deleteprojectFromState(id);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const projects = this.props.projects.map((project) => {
      return (
        <tr key={project.id}>
          <th scope="row">{project.id}</th>
          <td>{project.username}</td>
          <td>{project.title}</td>
          <td>{project.zip_code}</td>
          <td>{project.cost}</td>
          <td>{project.done}</td>
          <td>{project.deadline}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                project={project}
                updateState={this.props.updateState}
              />{" "}
              <Button
                color="danger"
                onClick={() => this.deleteproject(project.id)}
              >
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Title</th>
            <th>Zip Code</th>
            <th>Cost</th>
            <th>Done</th>
            <th>DeadLine</th>
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </Table>
    );
  }
}

export default DataTable;
