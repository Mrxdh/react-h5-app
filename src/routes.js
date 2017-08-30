import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom'
import App from './App';
import Root from './containers/Root';
import Light from './containers/Light';

export default () => (
    <Router>
        <Root>
            <Switch>
                <Route path='/light' component={ Light }/>
                <Route component={ App }/>
            </Switch>
        </Root>
    </Router>
)