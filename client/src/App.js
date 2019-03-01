import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from './axios-jokes';
import Header from './components/header';
import AuthContext from './auth-context';
import LoginPage from './containers/login';
import './App.css';

class App extends Component {
  state = {
    authorized: false
  }
  login = (username, password) => {
    axios.post('', {username, password}).then(user => {

    }).catch(err => {
      console.log(err)
    })
  }
  logout = () => {
    localStorage.clear('token')
  }

  render() {
    return (
      <AuthContext.Provider value={{authorized: this.state.authorized, login: this.login, logout: this.logout}}>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" component={LoginPage} />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
