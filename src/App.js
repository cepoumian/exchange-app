import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom imports
import Layout from './Layout';
import Main from './Main'
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Main}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
