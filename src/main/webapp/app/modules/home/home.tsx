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
      receivedProfile: false
    };
  }

  componentDidMount() {
    this.props.getSession();
    this.props.getEntities();
  }

  componentWillReceiveProps() {
    console.log("received")
    console.log(this.props)
    if (this.state["receivedProfile"] == false && this.props.userId != undefined) {
      this.setState({receivedProfile: true})
      this.props.getEntity(this.props.userId);
    }
  }

  languages = () => (
    <Progress className="card-languages" multi>
      <Progress bar value="50">Java</Progress>
      <Progress bar color="success" value="30">Javascript</Progress>
      <Progress bar color="info" value="20">Typescript</Progress>
    </Progress>
  );
  technologies = () => (
    <div>
      <Badge color="info" pill>Spring</Badge>
      <Badge color="info" pill>React</Badge>
      <Badge color="info" pill>Dashboard</Badge>
    </div>
  );

  cardParticipants = (contributors) => {
    if (contributors != null) {
      return (
        <div className="card-participants">
          { contributors.map( (contributor, i) => {
            <span className="dot">{contributor}</span>
          })}
          <span className="dot"><p>+100</p></span>
        </div>
      )
    } else {
      return (
        <div className="card-participants">
          <span className="dot"><p>1</p></span>
        </div>
      )
    }
  };

  skills = () => {
    if (this.props.profile.skills != undefined) {
      return (
        this.props.profile.skills.map( (skill, i) => {
          <h4 key={i}>{skill}</h4>
        })
      )
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Row className="projects-container">
        <div>
          {/*{ console.log("data loaded") }*/}
          {/*{ console.log(this.props.projectList)}*/}

          <h4>Welcome back {this.props.account.firstName}!</h4>

          {this.skills()}

          <hr />
          <h4>Our Ecosystem</h4>
          <Progress className="card-languages" multi>
            <Progress bar value="50">Java</Progress>
            <Progress bar color="success" value="30">Javascript</Progress>
            <Progress bar color="info" value="20">Typescript</Progress>
          </Progress>

          <Progress className="card-languages" multi>
            <Progress bar value="25">Spring</Progress>
            <Progress bar color="success" value="60">React</Progress>
            <Progress bar color="info" value="15">Play</Progress>
          </Progress>
          <hr />

          <h4>Current Projects</h4>
          <CardColumns className="projects-current-container">
          </CardColumns>

          <hr />

          <h4>Latest Projects</h4>
          <h5>{this.props.projectList.length} Result(s)</h5>

          <CardColumns className="projects-current-container">
          {
            this.props.projectList.map( (project, i) => (
                <Card key={i}>
                  <CardBody>
                    <CardTitle>{project.name}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    {this.technologies()}
                    {this.cardParticipants(project.contributors)}
                    <CardText>{project.description}</CardText>
                    <Button className="project-explore-button">Explore</Button>
                  </CardBody>
                </Card>
            ))
          }
          </CardColumns>

          <hr />

          <h4>Recommended Projects</h4>
          <CardColumns className="projects-current-container">
            {/*<Card>*/}
              {/*<CardBody>*/}
                {/*<CardTitle>Card title</CardTitle>*/}
                {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
                {/*{this.languages()}*/}
                {/*{this.technologies()}*/}
                {/*{this.cardParticipants()}*/}
                {/*<CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>*/}
                {/*<Button className="project-explore-button">Explore</Button>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}

            {/*<Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>*/}
            {/*<CardTitle>Special Title Treatment</CardTitle>*/}
            {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
            {/*<Button>Button</Button>*/}
            {/*</Card>*/}
          </CardColumns>

        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => {
  console.log(storeState)
  return ({
    account: storeState.authentication.account,
    userId: storeState.authentication.account.id,
    isAuthenticated: storeState.authentication.isAuthenticated,
    projectList: storeState.project.entities,
    profile: storeState.userProfile
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
