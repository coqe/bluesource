import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Project from './project';
import Comment from './comment';
import Keyword from './keyword';
import Repo from './repo';
import UserProfile from './user-profile';
import Skill from './skill';
import Issue from './issue';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}/comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}/keyword`} component={Keyword} />
      <ErrorBoundaryRoute path={`${match.url}/repo`} component={Repo} />
      <ErrorBoundaryRoute path={`${match.url}/user-profile`} component={UserProfile} />
      <ErrorBoundaryRoute path={`${match.url}/skill`} component={Skill} />
      <ErrorBoundaryRoute path={`${match.url}/issue`} component={Issue} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
