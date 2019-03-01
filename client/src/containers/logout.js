import React from 'react'
import AuthContext from '../auth-context';

class Logout extends React.Component {
    static contextType = AuthContext;
    render() {
        return <h2>Hope you had a good laugh!</h2>
    }
    componentDidMount() {
        this.context.logout();
    }
}

export default Logout
