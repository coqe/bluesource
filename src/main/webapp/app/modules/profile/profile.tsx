import './profile.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, Container } from 'reactstrap';
import TagsInput from 'react-tagsinput'
// import AvatarEditor from 'react-avatar-editor'
// import "react-simple-flex-grid/lib/main.css";
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IProfileProp extends StateProps, DispatchProps {}

type MyState = { tags: string[] };
export class Profile extends React.Component<IProfileProp, MyState> {
  constructor(props, state) {
    super(props, state);
    this.state = {
      tags: []
    }
  }

  componentDidMount() {
    this.props.getSession();
  }

  handleChange(tags) {
    this.setState({tags})
  }

  render() {
    const { account } = this.props;
    return (
        <div>
<Container>
          <h4>My Profile</h4>

          <hr/>
<Row>
  <Col xl={8}>
          <Form>
            <FormGroup>
              <Label for="yourName">Your Name</Label>
              <Input type="yourName" name="yourName" id="yourName" value="Cocky Coder" />
            </FormGroup>
            <FormGroup>
              <Label for="roleSelect">Your Role</Label>
              <Input type="select" name="roleSelect" id="roleSelect">
                <option>Product Owner</option>
                <option selected>Engineer</option>
                <option>Quality Engineer</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="technologies">Your Skills</Label>
              <TagsInput value={this.state.tags} onChange={this.handleChange} />
            </FormGroup>

            <Button>Update</Button>
          </Form>
  </Col>
  <Col xl={4}>
          <Form>
            <FormGroup>
              {/*<AvatarEditor*/}
                {/*image="../../../content/images/hipster192.png"*/}
                {/*width={150}*/}
                {/*height={150}*/}
                {/*border={0}*/}
                {/*color={[255, 255, 255, 0.6]} // RGBA*/}
                {/*scale={1.0}*/}
                {/*rotate={0}*/}
              {/*/>*/}
            </FormGroup>
            <FormGroup>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Upload a new profile picture.
              </FormText>
            </FormGroup>
          </Form>
  </Col>
</Row>
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
)(Profile);
