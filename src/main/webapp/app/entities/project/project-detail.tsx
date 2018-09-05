import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProjectDetail extends React.Component<IProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Project [<b>{projectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{projectEntity.name}</dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dueDate">Due Date</span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.dueDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{projectEntity.description}</dd>
            <dt>
              <span id="logo">Logo</span>
            </dt>
            <dd>
              {projectEntity.logo ? (
                <div>
                  <a onClick={openFile(projectEntity.logoContentType, projectEntity.logo)}>
                    <img src={`data:${projectEntity.logoContentType};base64,${projectEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {projectEntity.logoContentType}, {byteSize(projectEntity.logo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="interest">Interest</span>
            </dt>
            <dd>{projectEntity.interest}</dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{projectEntity.status}</dd>
            <dt>
              <span id="issueTrackerUri">Issue Tracker Uri</span>
            </dt>
            <dd>{projectEntity.issueTrackerUri}</dd>
            <dt>
              <span id="attachment">Attachment</span>
            </dt>
            <dd>
              {projectEntity.attachment ? (
                <div>
                  <a onClick={openFile(projectEntity.attachmentContentType, projectEntity.attachment)}>Open&nbsp;</a>
                  <span>
                    {projectEntity.attachmentContentType}, {byteSize(projectEntity.attachment)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>Repo</dt>
            <dd>{projectEntity.repo ? projectEntity.repo.uri : ''}</dd>
            <dt>Created By</dt>
            <dd>{projectEntity.createdBy ? projectEntity.createdBy.id : ''}</dd>
            <dt>Issue</dt>
            <dd>{projectEntity.issue ? projectEntity.issue.summary : ''}</dd>
            <dt>Technologies</dt>
            <dd>
              {projectEntity.technologies
                ? projectEntity.technologies.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.word}</a>
                      {i === projectEntity.technologies.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Contributor</dt>
            <dd>
              {projectEntity.contributors
                ? projectEntity.contributors.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === projectEntity.contributors.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Admin</dt>
            <dd>
              {projectEntity.admins
                ? projectEntity.admins.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === projectEntity.admins.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/project/${projectEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
