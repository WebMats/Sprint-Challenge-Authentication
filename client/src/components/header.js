import React from 'react'
import { NavLink } from 'react-router-dom';
import AuthContext from '../auth-context';

const header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand">Dad Jokes <span role="img">🤣</span></a>
        <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <AuthContext.Consumer>
            {({authorized}) => (
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                      {authorized && <li className="nav-item active"><NavLink to="/" className="nav-link">Home</NavLink></li>}
                      {authorized && <li className="nav-item"><NavLink to="/jokes" className="nav-link">Jokes</NavLink></li>}
                      {authorized && <li className="nav-item"><NavLink to="/logout" className="nav-link">Logout</NavLink></li>}
                      {!authorized && <li className="nav-item"><NavLink to="/" className="nav-link">Login</NavLink></li>}
                      {!authorized && <li className="nav-item"><NavLink to="/signup" className="nav-link">Signup</NavLink></li>}
                    </ul>
                </div>
            )}
        </AuthContext.Consumer>
        
    </nav>
)

export default header
