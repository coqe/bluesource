import './profile.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, Container, Badge, Image } from 'reactstrap';
import TagsInput from 'react-tagsinput'
// import AvatarEditor from 'react-avatar-editor'
// import "react-simple-flex-grid/lib/main.css";
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getSearchEntities, getEntities, reset } from 'app/entities/project/project.reducer';

import { getEntity } from 'app/entities/user-profile/user-profile.reducer';
import {Home} from "app/modules/home/home";

export interface IProfileProp extends StateProps, DispatchProps {}

export class Profile extends React.Component<IProfileProp> {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getSession();
    if (this.props.isAuthenticated) {
      this.props.getEntities();
    }
    if (this.props.account.id != undefined) {
      this.props.getEntity(this.props.account.id);
    }
  }

  handleChange(tags) {
    this.setState({tags})
  }

  technologies = (skills) => (
    <div className="skills-container">
      { skills.map((skill,i) =>
        <Badge key={i} color="secondary" pill>{skill.word}</Badge>
      )}
    </div>
  );

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
              <Label for="yourFirstName">Your First Name</Label>
              <Input type="yourFirstName" name="yourFirstName" id="yourFirstName" value={this.props.account.firstName} />
            </FormGroup>
            <FormGroup>
              <Label for="yourLastName">Your Last Name</Label>
              <Input type="yourLastName" name="yourLastName" id="yourLastName" value={this.props.account.lastName} />
            </FormGroup>
            <FormGroup>
              <Label for="roleSelect">Your Role: {this.props.profile.role}</Label>
              <Input type="select" name="roleSelect" id="roleSelect">
                <option>Product Owner</option>
                <option selected>Engineer</option>
                <option>Quality Engineer</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="technologiesNotWorking">Your Skills</Label>
              <TagsInput value={this.props.tags} onChange={this.handleChange} />
            </FormGroup>

            <Button>Update</Button>
          </Form>
  </Col>
  <Col xl={4}>
    <img src={this.props.account.imageUrl} height={150} width={150}/>
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

const mapStateToProps = storeState => {
  console.log(storeState);
  return ({
    account: storeState.authentication.account,
    userId: storeState.authentication.account.id,
    isAuthenticated: storeState.authentication.isAuthenticated,
    projectList: storeState.project.entities,
    profile: storeState.userProfile.entity,
    tags: ["objective-c", "excel"]
  });
}
const mapDispatchToProps = {
  getSession,
  getSearchEntities,
  getEntities,
  getEntity
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);









