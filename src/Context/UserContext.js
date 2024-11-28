// src/Components/Context/UserContext.js
import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Provider component that wraps your app and provides the context
const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser state

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Export both UserContext and UserProvider
export { UserProvider, UserContext };