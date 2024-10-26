// src/components/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context to store the auth state
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null); // Add email state
    const [userDept, setUserDept] = useState(localStorage.getItem('userDept') || null);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    // Function to log in and save the token and email
    const login = (userToken, email,dept,name) => {
        setToken(userToken);
        setUserEmail(email); // Set the user email
        setUserDept(dept);
        setUserName(name);
        localStorage.setItem('authToken', userToken); // Save token in localStorage
        localStorage.setItem('userEmail', email); // Save email in localStorage
        localStorage.setItem('userDept', dept);
        localStorage.setItem('userName', name);
    };

    // Function to log out and clear the token and email
    const logout = () => {
        setToken(null);
        setUserEmail(null); // Clear the user email
        localStorage.removeItem('authToken'); // Remove token from localStorage
        localStorage.removeItem('userEmail'); // Remove email from localStorage
        localStorage.removeItem('userDept');
        localStorage.removeItem('userName');
    };

    const value = {
        token,
        userEmail, // Include user email in the context value
        isLoggedIn: !!token,
        userDept,
        userName,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
