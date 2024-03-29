import React, { useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";

const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    // Authprovider that handles the entire application state that’s great about react context	
    // add some usefull hooks for initial  state
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // re navigate router to somewhere
    const history = useHistory();

    useEffect(() => {
        // on auth change or new user add or delete
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            // re navigate to our chat page when user is added  
           if(user) history.push('/chats');
        })
    }, [user, history]);
    const value = { user };
    return (
        // pass users to all children 
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}