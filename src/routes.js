import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Editor from './components/Editor/Editor';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed';
import Users from './components/Users/Users';
// import Login from './components/Login/Login';
import App from './App';

export default (
  <Switch>
    <Route exact path="/" component={Feed}/>
    <Route path="/users" component={Users}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/editor" component={Editor}/>
  </Switch>
);