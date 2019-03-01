import React from 'react';

const authContext = React.createContext({
    authorized: null,
    login: (username, password) => {},
    logout: () => {}
})

export default authContext;