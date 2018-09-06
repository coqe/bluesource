import './header.css';

import React from 'react';
import axios from 'axios';

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

    if(event.target.value < 3) {
      this.setState({results: []});
    } else {

      this.setState({searchValue: event.target.value});
      this.elasticSearch(event.target.value)
    }
  };

  elasticSearch = (value) => {

    let url = `http://localhost:8080/api/_search/projects?query=${value}`;

      axios.get(url)
        .then(response => {
          console.log("Elastic Search Data " + JSON.stringify(response.data));
          this.setState({results: response.data});
        });

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
          <Brand />

          <Input type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="search for a project" />

          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {this.state.results.length > 0 ? <Redirect to='/dashboard' /> : null}

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
