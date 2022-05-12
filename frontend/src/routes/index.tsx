import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { useAuth } from '../hooks/auth';
import { Main } from '../pages/Main';

const Routes: React.FC = () => {
  const { user } = useAuth();
  return (
    <Switch>
      <Route path="/" exact>
        {user ? <Redirect to="/main" /> : <SignIn />}
      </Route>
      <Route path="/main">{user ? <Main /> : <Redirect to="/" />}</Route>
    </Switch>
  );
};

export default Routes;
