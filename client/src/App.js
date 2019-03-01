import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from './axios-jokes';
import Header from './components/header';
import AuthContext from './auth-context';
import JokesPage from './containers/jokes';
import LoginPage from './containers/login';
import RegisterPage from './containers/register';
import LogoutPage from './containers/logout';
import './App.css';

class App extends Component {
  state = {
    authorized: !!localStorage.getItem('token') || false,
    user: {},
    error: null
  }
  login = (username, password, path) => {
    axios.post(`/${path}`, {username, password}).then( async ({data: authData}) => {
      if (authData.token) {
        await this.setState(state => {
          const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000 * 60)
          localStorage.setItem('exp', expirationDate);
          localStorage.setItem('token', authData.token);
          return {authorized: true, user: authData.user}}
          );
      } else {
        this.setState({error: "Could not authenticate you."})
      }
    }).catch(err => {
      console.log(err)
    })
  }
  logout = () => {
    localStorage.clear('token')
    localStorage.clear('exp');
    this.setState({authorized: false, user: {}})
  }

  render() {
    const authorized = this.state.authorized;
    return (
      <AuthContext.Provider value={{authorized: this.state.authorized, login: this.login, logout: this.logout}}>
        <div className="App">
          <Header />
          <Switch>
            {!authorized && <Route path="/" exact component={LoginPage} />}
            {!authorized && <Route path="/register" component={RegisterPage} />}
            {authorized && <Route path="/jokes" component={JokesPage} />}
            {authorized && <Route path="/logout" component={LogoutPage} />}
            {authorized && <Redirect to="/jokes" />}
            {!authorized && <Redirect exact to="/" />}
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
