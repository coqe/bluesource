import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/project">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Project
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/comment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Comment
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/keyword">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Keyword
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/repo">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Repo
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/user-profile">
      <FontAwesomeIcon icon="asterisk" />&nbsp;User Profile
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/issue">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Issue
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
