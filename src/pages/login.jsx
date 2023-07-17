import { useState } from "react";
import axios from "axios";
import { User } from "../api/models.ts";
import LoginContainer from "../components/login/login.component";

const Login = () => {
    const [user, setUser] = useState(new User());
    const baseApiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

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
        let response = await axios.post(baseApiUrl + "/User/authenticate", {
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