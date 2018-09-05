import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './issue.reducer';
import { IIssue } from 'app/shared/model/issue.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIssueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class IssueDetail extends React.Component<IIssueDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { issueEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Issue [<b>{issueEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="summary">Summary</span>
            </dt>
            <dd>{issueEntity.summary}</dd>
            <dt>
              <span id="fullDescription">Full Description</span>
            </dt>
            <dd>{issueEntity.fullDescription}</dd>
            <dt>
              <span id="interest">Interest</span>
            </dt>
            <dd>{issueEntity.interest}</dd>
            <dt>
              <span id="rewards">Rewards</span>
            </dt>
            <dd>{issueEntity.rewards}</dd>
            <dt>Created By</dt>
            <dd>{issueEntity.createdBy ? issueEntity.createdBy.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/issue" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/issue/${issueEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ issue }: IRootState) => ({
  issueEntity: issue.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueDetail);
