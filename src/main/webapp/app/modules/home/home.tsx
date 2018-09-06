import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Badge, Button, CardColumns, Progress, Card, CardImg, CardBody, CardDeck, CardTitle, CardLink, CardSubtitle, CardText } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getSearchEntities, getEntities, reset } from 'app/entities/project/project.reducer';

import { getEntity } from 'app/entities/user-profile/user-profile.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {

  constructor(props) {
    super(props);

    this.state = {
      currentProjects: [],
      recommendedProjects: [],
      fetchedProfile: false
    };
  }

  componentDidMount() {
    this.props.getSession();
    if (this.props.isAuthenticated) {
      this.props.getEntities();
    }
    if (this.props.account.id != undefined) {
      this.props.getEntity(this.props.account.id);
    }
  }

  componentWillReceiveProps() { }

  listProjects = (projects) => (
    <CardColumns className="projects-current-container">
      {
        projects.map( (project, i) => (
          <Card key={i}>
            <CardBody>
              <h6 className="projects-interest">Interest <Badge color="secondary">{project.interest}</Badge></h6>
              <CardTitle>{project.name}</CardTitle>
              <a href={project.repo.uri} target="_blank" className="projects-repo-url">{project.repo ? project.repo.uri : null}</a>
              {this.technologies(project.technologies)}
              {this.contributors(project.contributors)}
              <CardText>{project.description}</CardText>
              <h6>Contributors <Badge color="secondary">{project.contributors.length}</Badge></h6>
            </CardBody>
          </Card>
        ))
      }
    </CardColumns>
  )


  technologies = (skills) => (
    <div className="skills-container">
      { skills.map((skill,i) =>
        <Badge key={i} color="secondary" pill>{skill.word}</Badge>
      )}
    </div>
  );

  contributors = (contributors) => {
    if (contributors != null) {
      return (
        <div className="card-participants">
          { contributors.map( (contributor, i) =>
            <span className="dot">
              <p>
                {contributor.account.firstName.charAt(0).toUpperCase()}{contributor.account.lastName.charAt(0).toUpperCase()}
              </p>
              </span>
          )}
        </div>
      )
    } else {
      return (
        <div className="card-participants">
          <span className="dot"><p>0</p></span>
        </div>
      )
    }
  };

  render() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // front end filtering :/
    const userProjects = this.props.projectList.filter( (project) => {
      return project.contributors.filter((contributor) => {
        return contributor.id == this.props.userId
      }).length > 0
    });


    return (
      <Row className="projects-container">
        <div className="projects-container-inner">

          <h4>Welcome back {this.props.account.firstName}!</h4>
          <h5>{this.props.profile.role}</h5>
          <p className="projects-container-inner-skills-tag">Your skills: </p> { Object.keys(this.props.profile).length > 0 ? this.technologies(this.props.profile.skills) : null }

          <hr />
          <h4>Your Projects</h4>
          {this.listProjects(userProjects)}

          <hr />
          <h4>Recommended Projects</h4>

          <hr />
          <h4>Latest Projects</h4>
          <h5>{this.props.projectList.length} Result(s)</h5>
          {this.listProjects(this.props.projectList)}

        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => {
  console.log(storeState);
  return ({
    account: storeState.authentication.account,
    userId: storeState.authentication.account.id,
    isAuthenticated: storeState.authentication.isAuthenticated,
    projectList: storeState.project.entities,
    profile: storeState.userProfile.entity
  });
}


const mapDispatchToProps = {
  getSession,
  getSearchEntities,
  getEntities,
  getEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
