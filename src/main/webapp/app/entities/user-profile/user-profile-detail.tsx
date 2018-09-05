import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-profile.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class UserProfileDetail extends React.Component<IUserProfileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userProfileEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            UserProfile [<b>{userProfileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="role">Role</span>
            </dt>
            <dd>{userProfileEntity.role}</dd>
            <dt>
              <span id="avatar">Avatar</span>
            </dt>
            <dd>
              {userProfileEntity.avatar ? (
                <div>
                  <a onClick={openFile(userProfileEntity.avatarContentType, userProfileEntity.avatar)}>
                    <img
                      src={`data:${userProfileEntity.avatarContentType};base64,${userProfileEntity.avatar}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {userProfileEntity.avatarContentType}, {byteSize(userProfileEntity.avatar)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>Account</dt>
            <dd>{userProfileEntity.account ? userProfileEntity.account.login : ''}</dd>
            <dt>Skill</dt>
            <dd>
              {userProfileEntity.skills
                ? userProfileEntity.skills.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userProfileEntity.skills.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Created</dt>
            <dd>{userProfileEntity.created ? userProfileEntity.created.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-profile" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/user-profile/${userProfileEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userProfile }: IRootState) => ({
  userProfileEntity: userProfile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileDetail);
