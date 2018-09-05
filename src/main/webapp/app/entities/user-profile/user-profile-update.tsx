import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ISkill } from 'app/shared/model/skill.model';
import { getEntities as getSkills } from 'app/entities/skill/skill.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IUserProfileUpdateState {
  isNew: boolean;
  idsskill: any[];
  accountId: number;
  createdId: number;
  projectId: number;
  administratorId: number;
}

export class UserProfileUpdate extends React.Component<IUserProfileUpdateProps, IUserProfileUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsskill: [],
      accountId: 0,
      createdId: 0,
      projectId: 0,
      administratorId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getSkills();
    this.props.getProjects();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userProfileEntity } = this.props;
      const entity = {
        ...userProfileEntity,
        ...values,
        skills: mapIdList(values.skills)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/user-profile');
  };

  render() {
    const { userProfileEntity, users, skills, projects, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avatar, avatarContentType } = userProfileEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluesourceApp.userProfile.home.createOrEditLabel">Create or edit a UserProfile</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userProfileEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="user-profile-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="roleLabel" for="role">
                    Role
                  </Label>
                  <AvField id="user-profile-role" type="text" name="role" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="avatarLabel" for="avatar">
                      Avatar
                    </Label>
                    <br />
                    {avatar ? (
                      <div>
                        <a onClick={openFile(avatarContentType, avatar)}>
                          <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {avatarContentType}, {byteSize(avatar)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('avatar')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
                    <AvInput type="hidden" name="avatar" value={avatar} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="account.login">Account</Label>
                  <AvInput id="user-profile-account" type="select" className="form-control" name="account.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="skills">Skill</Label>
                  <AvInput
                    id="user-profile-skill"
                    type="select"
                    multiple
                    className="form-control"
                    name="skills"
                    value={userProfileEntity.skills && userProfileEntity.skills.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {skills
                      ? skills.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="created.id">Created</Label>
                  <AvInput id="user-profile-created" type="select" className="form-control" name="created.id">
                    <option value="" key="0" />
                    {projects
                      ? projects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-profile" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  skills: storeState.skill.entities,
  projects: storeState.project.entities,
  userProfileEntity: storeState.userProfile.entity,
  loading: storeState.userProfile.loading,
  updating: storeState.userProfile.updating
});

const mapDispatchToProps = {
  getUsers,
  getSkills,
  getProjects,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileUpdate);
