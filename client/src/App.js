import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
