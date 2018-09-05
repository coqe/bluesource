import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './repo.reducer';
import { IRepo } from 'app/shared/model/repo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRepoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class RepoDetail extends React.Component<IRepoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { repoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Repo [<b>{repoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="uri">Uri</span>
            </dt>
            <dd>{repoEntity.uri}</dd>
          </dl>
          <Button tag={Link} to="/entity/repo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/repo/${repoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ repo }: IRootState) => ({
  repoEntity: repo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoDetail);
