import React, { createContext, useState, useEffect } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [user, setUser] = useState(null);

    const fetchUser = () => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
            const token = access_token.split(".")[1];
            const userData = { ...JSON.parse(atob(token)), authenticated: true };
            setUser(userData);
        }
    };

    // fetch a user from a fake backend API
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        // the Provider gives access to the context to its children
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };
