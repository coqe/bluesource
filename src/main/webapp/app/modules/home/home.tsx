import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Badge, Button, CardColumns, Progress, Card, CardImg, CardBody, CardDeck, CardTitle, CardLink, CardSubtitle, CardText } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  cardParticipants = () => {
    <div className="card-participants">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
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
  cardParticipants = () => (
    <div className="card-participants">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"><p>+100</p></span>
    </div>
  )

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Row className="projects-container">
        <div>

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
            <Progress bar color="info" value="15g">Play</Progress>
          </Progress>

          <hr />

          <h4>Current Projects</h4>
          <h5>10 Results</h5>

          <CardColumns className="projects-current-container">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                {this.languages()}
                {this.technologies()}
                {this.cardParticipants()}
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button className="project-explore-button">Explore</Button>
              </CardBody>
            </Card>


            {/*<Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>*/}
              {/*<CardTitle>Special Title Treatment</CardTitle>*/}
              {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
              {/*<Button>Button</Button>*/}
            {/*</Card>*/}
          </CardColumns>

          <hr />

          <h4>Recommended Projects</h4>
          <CardColumns className="projects-current-container">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                {this.languages()}
                {this.technologies()}
                {this.cardParticipants()}
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button className="project-explore-button">Explore</Button>
              </CardBody>
            </Card>

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

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
