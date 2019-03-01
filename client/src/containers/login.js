import React, { Component } from 'react'
import AuthContext from '../auth-context';

export default class Login extends Component {
    static contextType = AuthContext
    loginHandler = () => {
        const [username, password] = [this.usernameInput.current.value, this.passwordInput.current.value];
        if (!username || !password) {
            return
        }
        this.context.login(username, password);
    }

  render() {
    return (
      <form style={{margin:"0 auto", maxWidth:"700px", width: "90%", paddingTop:"10rem"}}>
          <div className="row form-group">
            <div className="col-sm-10">
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" ref={this.usernameInput} className="form-control" />
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-10">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" ref={this.passwordInput} className="form-control" />
            </div>
          </div>
          <button onClick={this.loginHandler} type="button" className="btn btn-primary">Login</button>
      </form>
    )
  }
  constructor(props) {
    super(props)
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
}
}

