import { useState, createContext } from 'react'
import jwt from 'jwt-decode'
import { useLayoutEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        let token = localStorage.getItem('jwt');
        if (token) {
            const user = jwt(token);
            setUser(user);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;