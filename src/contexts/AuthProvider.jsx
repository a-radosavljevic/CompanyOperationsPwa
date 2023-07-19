import { useState, createContext } from 'react'
import jwt from 'jwt-decode'
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        let token = localStorage.getItem('jwt');
        if (token) {
            const user = jwt(token);
            setUser(user);
        }
    }, [])

    useEffect(() => {
        user && setLoading(false);
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;