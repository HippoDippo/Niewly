import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';

import Parser from './components/Parser/Parser';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Parser />
    </Provider>
  </Router>,
  document.getElementById('root')
);