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

  languages = () => (
    <Progress className="card-languages" multi>
      <Progress bar value="50">Java</Progress>
      <Progress bar color="success" value="30">Javascript</Progress>
      <Progress bar color="info" value="20">Typescript</Progress>
    </Progress>
  );


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
          { contributors.map( (contributor, i) => {
            <span className="dot">{contributor}</span>
          })}
          <span className="dot"><p>+n</p></span>
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

    return (
      <Row className="projects-container">
        <div className="projects-container-inner">

          <h4>Welcome back {this.props.account.firstName}!</h4>
          <h5>{this.props.profile.role}</h5>
          <p className="projects-container-inner-skills-tag">Your skills: </p> { Object.keys(this.props.profile).length > 0 ? this.technologies(this.props.profile.skills) : null }

          <hr />
          <h4>Your Projects</h4>
          {
            this.props.projectList.filter((project) => {
              return project.contributors != null
                && project.contributors.filter((con) => con.id == this.props.account.id).length > 0;
            })
          }

          <hr />
          <h4>Recommended Projects</h4>


          <hr />
          <h4>Latest Projects</h4>
          <h5>{this.props.projectList.length} Result(s)</h5>

          <CardColumns className="projects-current-container">
          {
            this.props.projectList.map( (project, i) => (
                <Card key={i}>
                  <CardBody>
                    <Badge key={i} color="primary" className={"projects-interest"}>{project.interest}</Badge>
                    <CardTitle>{project.name}</CardTitle>
                    <p className={"projects-repo-url"}>{project.repo.uri}</p>
                    {this.technologies([{"word":"spring"},{"word":"react"},{"word":"dashboard"}])}
                    {this.contributors(project.contributors)}
                    <CardText>{project.description}</CardText>
                    <Button className="project-explore-button">Explore</Button>
                  </CardBody>
                </Card>
            ))
          }
          </CardColumns>

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
