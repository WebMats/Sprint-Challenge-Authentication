import React from 'react'
import { NavLink } from 'react-router-dom';

const header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Dad Jokes 🤣</a>
        <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/jokes" className="nav-link">Jokes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/logout" className="nav-link">Logout</NavLink>
            </li>
          </ul>
        </div>
    </nav>
)

export default header
