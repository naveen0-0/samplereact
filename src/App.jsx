import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage';
import About from './components/About';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact><HomePage/></Route>
        <Route path="/about"><About/></Route>
      </Switch>
    </Router>
  )
}
