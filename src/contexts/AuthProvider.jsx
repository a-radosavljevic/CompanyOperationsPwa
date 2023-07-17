import { useState, createContext, useEffect } from 'react'
import { User } from "../api/models.ts";
import jwt from 'jwt-decode'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('jwt');
        if (token) {
            const user = jwt(token);
            console.log(user.email);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;