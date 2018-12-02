import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Contents from './components/Contents';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Layout} />
          <Route path='/Search' exact component={Layout} />
          {/* <Route path='/Contents' exact component={Contents} /> */}
          {/* <Route path='/Login' exact component={Login} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
