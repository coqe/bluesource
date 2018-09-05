import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Keyword from './keyword';
import KeywordDetail from './keyword-detail';
import KeywordUpdate from './keyword-update';
import KeywordDeleteDialog from './keyword-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KeywordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KeywordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KeywordDetail} />
      <ErrorBoundaryRoute path={match.url} component={Keyword} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={KeywordDeleteDialog} />
  </>
);

export default Routes;
