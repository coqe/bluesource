import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Repo from './repo';
import RepoDetail from './repo-detail';
import RepoUpdate from './repo-update';
import RepoDeleteDialog from './repo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RepoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RepoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RepoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Repo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RepoDeleteDialog} />
  </>
);

export default Routes;
