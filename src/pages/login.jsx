import { useState } from "react";
import { User } from "../api/models.ts";
import LoginContainer from "../components/login/login.component";
import http from "../api/http.js";

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

    const handleSubmit = async event => {
        let response = await http.post("/User/authenticate", {
            email: user.email,
            password: user.password
        })
        console.log(response.data.token, response.data.user);

        localStorage.setItem('jwt', response.data.token);
        window.location.href = "/"
        //serviceWorker.register();
        //serviceWorker.requestPermission();
    };

    return (
        <LoginContainer handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handleSubmit={handleSubmit} />
    )
}

export default Login;