import { useState } from "react";
import { User } from "../api/models.ts";
import LoginContainer from "../components/login/login.component";
import http from "../api/http.js";
import { ErrorMessage } from '../utils/messager.js'

const Login = () => {
    const [user, setUser] = useState(new User());

    const handleEmailChange = event => {
        let userObj = user;
        userObj.email = event.target.value;
        setUser(userObj);
    };

    const handlePasswordChange = event => {
        let userObj = user;
        userObj.password = event.target.value;
        setUser(userObj);
    };

    const handleSubmit = async () => {
        try {
            let response = await http.post("/User/authenticate", {
                email: user.email,
                password: user.password
            })
            if (response.status === 200) {
                console.log(response.data.token, response.data.user);
                localStorage.setItem('jwt', response.data.token);
                window.location.href = "/"
            }
            else {
                ErrorMessage('Imejl adresa ili lozinka nisu ispravni, pokušajte ponovo', '');
            }
        }
        catch (err) {
            ErrorMessage('Imejl adresa ili lozinka nisu ispravni, pokušajte ponovo', '');
        }
    };

    return (
        <LoginContainer handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handleSubmit={handleSubmit} />
    )
}

export default Login;