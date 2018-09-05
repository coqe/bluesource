import './profile.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IProfileProp extends StateProps, DispatchProps {}

export class Profile extends React.Component<IProfileProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <div>

          <h4>My Profile</h4>

          <hr/>

          <Form>
            <FormGroup>
              <Label for="yourName">Your Name</Label>
              <Input type="yourName" name="yourName" id="yourName" value="Cocky Coder" />
            </FormGroup>
            <FormGroup>
              <Label for="roleSelect">Select Role</Label>
              <Input type="select" name="roleSelect" id="roleSelect">
                <option>Product Owner</option>
                <option selected>Engineer</option>
                <option>Quality Engineer</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="technologies">Skills</Label>
              <Input type="input" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Change Picture</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Upload a new profile picture.
              </FormText>
            </FormGroup>
            <Button>Update</Button>
          </Form>

        </div>
      </Row>
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
)(Profile);
