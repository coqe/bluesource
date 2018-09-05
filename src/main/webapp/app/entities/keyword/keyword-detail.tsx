import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './keyword.reducer';
import { IKeyword } from 'app/shared/model/keyword.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKeywordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class KeywordDetail extends React.Component<IKeywordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { keywordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Keyword [<b>{keywordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="word">Word</span>
            </dt>
            <dd>{keywordEntity.word}</dd>
          </dl>
          <Button tag={Link} to="/entity/keyword" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/keyword/${keywordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ keyword }: IRootState) => ({
  keywordEntity: keyword.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordDetail);
