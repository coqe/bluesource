import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './keyword.reducer';
import { IKeyword } from 'app/shared/model/keyword.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKeywordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IKeywordUpdateState {
  isNew: boolean;
  projectId: number;
  userId: number;
}

export class KeywordUpdate extends React.Component<IKeywordUpdateProps, IKeywordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      projectId: 0,
      userId: 0,
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

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { keywordEntity } = this.props;
      const entity = {
        ...keywordEntity,
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
    this.props.history.push('/entity/keyword');
  };

  render() {
    const { keywordEntity, projects, userProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluesourceApp.keyword.home.createOrEditLabel">Create or edit a Keyword</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : keywordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="keyword-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="wordLabel" for="word">
                    Word
                  </Label>
                  <AvField
                    id="keyword-word"
                    type="text"
                    name="word"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/keyword" replace color="info">
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
  keywordEntity: storeState.keyword.entity,
  loading: storeState.keyword.loading,
  updating: storeState.keyword.updating
});

const mapDispatchToProps = {
  getProjects,
  getUserProfiles,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordUpdate);
