import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CommentDetail extends React.Component<ICommentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Comment [<b>{commentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="text">Text</span>
            </dt>
            <dd>{commentEntity.text}</dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={commentEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Project</dt>
            <dd>{commentEntity.project ? commentEntity.project.name : ''}</dd>
            <dt>Issue</dt>
            <dd>{commentEntity.issue ? commentEntity.issue.summary : ''}</dd>
            <dt>Made By</dt>
            <dd>{commentEntity.madeBy ? commentEntity.madeBy.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/comment/${commentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ comment }: IRootState) => ({
  commentEntity: comment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDetail);
