import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Custom modules
import Layout from './Layout';
import Main from './Main';
import Swapper from './Swapper';
//Custom styles
import './App.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Main}/>
          <Route path="/swapper" component={Swapper}/>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
