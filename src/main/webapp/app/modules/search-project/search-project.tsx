import './search-project.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface ISearchProjectProp extends StateProps, DispatchProps {}

export class SearchProject extends React.Component<ISearchProjectProp> {

  componentDidMount() {
    this.props.getSession();
    this.state = {
      projects: []
    };
  }

  getProjects() {
    //Get projects with axios
  }

  render() {
    const { account } = this.props;
    return (
      <CardColumns>
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
        <Card>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </CardColumns>
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
)(SearchProject);
