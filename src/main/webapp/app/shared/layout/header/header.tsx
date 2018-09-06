import './header.css';

import React from 'react';
import axios from 'axios';

import { Row, Col, Alert, Table, Form, FormGroup, FormText, Label, Badge, Button, CardColumns, Progress, Card, CardImg, CardBody, CardDeck, CardTitle, CardLink, CardSubtitle, CardText } from 'reactstrap';

import ModalExample  from 'app/modules/search-project/search-model';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {NavLink as Link, Redirect} from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from './menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

export interface IHeaderState {
  menuOpen: boolean;
  searchValue: string;
  results: Array<String>;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props) {
    super(props);
    this.state  = {
      menuOpen: false,
      searchValue: "",
      results: []
    }

  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };


  handleChange = (event) => {
      this.setState({searchValue: event.target.value});
      this.elasticSearch(event.target.value)
  };

  elasticSearch = (value) => {

    let url = `http://localhost:8080/api/_search/projects?query=${value}`;

      axios.get(url)
        .then(response => {
          console.log("Elastic Search Data " + JSON.stringify(response.data));
          this.setState({results: response.data});
        });

  };

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
    const { isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">

        {/*{this.renderDevRibbon()}*/}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />

          <div className="header-logo-text-container">
            <Brand />
            <h2 className="header-logo-text">Blue Source</h2>
          </div>

          {/*<Input type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="search for a project" className="header-search-bar"/>*/}

          <ModalExample />

          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {this.state.results.length > 0 ?
                <CardColumns className="projects-current-container">
                  {
                    this.state.results.map( (project, i) => (
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
                : null}

              <Home />


              {isAuthenticated && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
