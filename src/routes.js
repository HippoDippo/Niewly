import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';
import Users from './components/Users/Users';
import Landing from './components/Landing/Landing';

export default (
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/feed" component={Feed}/>
    <Route path="/users" component={Users}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/editor" component={Editor}/>
  </Switch>
);