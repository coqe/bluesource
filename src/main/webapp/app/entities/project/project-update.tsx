import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRepo } from 'app/shared/model/repo.model';
import { getEntities as getRepos } from 'app/entities/repo/repo.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { IKeyword } from 'app/shared/model/keyword.model';
import { getEntities as getKeywords } from 'app/entities/keyword/keyword.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IProjectUpdateState {
  isNew: boolean;
  idscontributor: any[];
  idsadmins: any[];
  idstechnologies: any[];
  repoId: number;
  createdById: number;
}

export class ProjectUpdate extends React.Component<IProjectUpdateProps, IProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscontributor: [],
      idsadmins: [],
      idstechnologies: [],
      repoId: 0,
      createdById: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRepos();
    this.props.getUserProfiles();
    this.props.getKeywords();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.createdAt = new Date(values.createdAt);

    if (errors.length === 0) {
      const { projectEntity } = this.props;
      const entity = {
        ...projectEntity,
        ...values,
        contributors: mapIdList(values.contributors),
        admins: mapIdList(values.admins),
        technologies: mapIdList(values.technologies)
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
    this.props.history.push('/entity/project');
  };

  render() {
    const { projectEntity, repos, userProfiles, keywords, loading, updating } = this.props;
    const { isNew } = this.state;

    const { logo, logoContentType, attachment, attachmentContentType } = projectEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluesourceApp.project.home.createOrEditLabel">Create or edit a Project</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : projectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField
                    id="project-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="project-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    value={isNew ? null : convertDateTimeFromServer(this.props.projectEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvField id="project-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="logoLabel" for="logo">
                      Logo
                    </Label>
                    <br />
                    {logo ? (
                      <div>
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {logoContentType}, {byteSize(logo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('logo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_logo" type="file" onChange={this.onBlobChange(true, 'logo')} accept="image/*" />
                    <AvInput type="hidden" name="logo" value={logo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    Status
                  </Label>
                  <AvField id="project-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="issueTrackerUriLabel" for="issueTrackerUri">
                    Issue Tracker Uri
                  </Label>
                  <AvField id="project-issueTrackerUri" type="text" name="issueTrackerUri" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="attachmentLabel" for="attachment">
                      Attachment
                    </Label>
                    <br />
                    {attachment ? (
                      <div>
                        <a onClick={openFile(attachmentContentType, attachment)}>Open</a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {attachmentContentType}, {byteSize(attachment)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('attachment')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_attachment" type="file" onChange={this.onBlobChange(false, 'attachment')} />
                    <AvInput type="hidden" name="attachment" value={attachment} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="repo.id">Repo</Label>
                  <AvInput id="project-repo" type="select" className="form-control" name="repo.id">
                    <option value="" key="0" />
                    {repos
                      ? repos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="keywords">Technologies</Label>
                  <AvInput
                    id="project-technologies"
                    type="select"
                    multiple
                    className="form-control"
                    name="technologies"
                    value={projectEntity.technologies && projectEntity.technologies.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {keywords
                      ? keywords.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="userProfiles">Contributor</Label>
                  <AvInput
                    id="project-contributor"
                    type="select"
                    multiple
                    className="form-control"
                    name="contributors"
                    value={projectEntity.contributors && projectEntity.contributors.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {userProfiles
                      ? userProfiles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="userProfiles">Admins</Label>
                  <AvInput
                    id="project-admins"
                    type="select"
                    multiple
                    className="form-control"
                    name="admins"
                    value={projectEntity.admins && projectEntity.admins.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {userProfiles
                      ? userProfiles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/project" replace color="info">
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
  repos: storeState.repo.entities,
  userProfiles: storeState.userProfile.entities,
  keywords: storeState.keyword.entities,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating
});

const mapDispatchToProps = {
  getRepos,
  getUserProfiles,
  getKeywords,
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
)(ProjectUpdate);
