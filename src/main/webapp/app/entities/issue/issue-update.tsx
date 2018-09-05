import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIssueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IIssueUpdateState {
  isNew: boolean;
  projectId: number;
  createdById: number;
}

export class IssueUpdate extends React.Component<IIssueUpdateProps, IIssueUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      projectId: 0,
      createdById: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getProjects();
    this.props.getUserProfiles();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { issueEntity } = this.props;
      const entity = {
        ...issueEntity,
        ...values
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
    this.props.history.push('/entity/issue');
  };

  render() {
    const { issueEntity, projects, userProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    const { fullDescription } = issueEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluesourceApp.issue.home.createOrEditLabel">Create or edit a Issue</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : issueEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="issue-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="summaryLabel" for="summary">
                    Summary
                  </Label>
                  <AvField id="issue-summary" type="text" name="summary" />
                </AvGroup>
                <AvGroup>
                  <Label id="fullDescriptionLabel" for="fullDescription">
                    Full Description
                  </Label>
                  <AvInput id="issue-fullDescription" type="textarea" name="fullDescription" />
                </AvGroup>
                <AvGroup>
                  <Label id="interestLabel" for="interest">
                    Interest
                  </Label>
                  <AvField id="issue-interest" type="number" className="form-control" name="interest" />
                </AvGroup>
                <AvGroup>
                  <Label id="rewardsLabel" for="rewards">
                    Rewards
                  </Label>
                  <AvField
                    id="issue-rewards"
                    type="number"
                    className="form-control"
                    name="rewards"
                    validate={{
                      min: { value: 0, errorMessage: 'This field should be at least {{ min }}.' },
                      max: { value: 1000, errorMessage: 'This field cannot be more than {{ max }}.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="project.name">Project</Label>
                  <AvInput id="issue-project" type="select" className="form-control" name="project.id">
                    <option value="" key="0" />
                    {projects
                      ? projects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="createdBy.id">Created By</Label>
                  <AvInput id="issue-createdBy" type="select" className="form-control" name="createdBy.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/issue" replace color="info">
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
  projects: storeState.project.entities,
  userProfiles: storeState.userProfile.entities,
  issueEntity: storeState.issue.entity,
  loading: storeState.issue.loading,
  updating: storeState.issue.updating
});

const mapDispatchToProps = {
  getProjects,
  getUserProfiles,
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
)(IssueUpdate);
