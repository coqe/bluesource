import './home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Row className="projects-container">
        <div>
          <hr />

          <h4>Current Projects</h4>

          <CardColumns className="search-project-container">
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text bsdlflsdfljdsklfjlksdjflkjsdlkfjlksdjflkjlksdfjlsdjfljsdklfjlksdjfkjsdlkfjlsdjflkjsdfelow as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </CardColumns>

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Project Owner</th>
                <th>Technologies</th>
                <th>Status</th>
                <th>Issues</th>
                <th>Committers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
              </tr>
              <tr>
                <th scope="row">2</th>
              </tr>
              <tr>
                <th scope="row">3</th>
              </tr>
            </tbody>
          </Table>

          <hr />

          <h4>Recommended Projects</h4>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name</th>
                <th>Project Owner</th>
                <th>Technologies</th>
                <th>Status</th>
                <th>Issues</th>
                <th>Committers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
              </tr>
              <tr>
                <th scope="row">2</th>
              </tr>
              <tr>
                <th scope="row">3</th>
              </tr>
            </tbody>
          </Table>
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
