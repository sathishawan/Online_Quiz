import React from 'react';
import './App.css';
import Home from './cmp/Home';
import About from './cmp/About';
// import Listing from './cmp/Listing';
import Login from './cmp/Login';
import Register from './cmp/Register';
import Nav from './cmp/Nav';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Nav/>

        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/home">
          <Home/>
          </Route>
          {/* <Route path="/list">
          <Listing/>
          </Route> */}
          <Route path="/register">
          <Register/>
          </Route>
          <Route path="/">
          <Login/>
          </Route>
          </Switch>
      </Router>


    </div>
  );
}

export default App;
