import './create-project.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, Container } from 'reactstrap';

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

import 'react-datepicker/dist/react-datepicker.css';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface ICreateProjectProp extends StateProps, DispatchProps {}

export class CreateProject extends React.Component<ICreateProjectProp> {

  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    this.props.getSession();
  }

  handleTagChange(tags) {
    this.setState({tags})
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const { account } = this.props;
    return (
      <div>
        <Container>
          <h4>Create a Project</h4>

          <hr/>

          <Form>
            <FormGroup>
              <Label for="projectName">Project Name</Label>
              <Input type="projectName" name="projectName" id="projectName" placeholder="your project name" />
            </FormGroup>

            <FormGroup>
              <Label for="sector">Business Sector</Label>
              <Input type="sector" name="sector" id="sector" placeholder="e.g. FXIP" />
            </FormGroup>


            <FormGroup>
              <Label for="projectDescription">Project Description</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
              <Label for="dateNeeded">Date Needed (Optional)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="technologies">Technologies</Label>
              <Input type="text" name="text" id="exampleText" />
            </FormGroup>

            <FormGroup>
              <Label for="gitRepo">Git Repo</Label>
              <Input type="gitRepo" name="gitRepo" id="gitRepo" placeholder="your git repo url" />
            </FormGroup>

            <FormGroup>
              <Label for="gitRepo">Add User</Label>
              <Input type="gitRepo" name="gitRepo" id="gitRepo" placeholder="add users you want added to the project" />
            </FormGroup>

            <Button>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
