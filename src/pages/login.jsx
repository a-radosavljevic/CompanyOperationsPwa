import { useState } from "react";
import { User } from "../api/models.ts";
import LoginContainer from "../components/login/login.component";
import http from "../api/http.js";
import { ErrorMessage } from '../utils/messager.js'
import Joi from 'joi-browser';
import { validateModel } from "../validation/input-validations.js";

const Login = () => {
    const [user, setUser] = useState(new User());
    const [errors, setErrors] = useState();

    const validationSchema = {
        email: Joi.string().max(250).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().max(250).required()
    }

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
        const validation = validateModel(user, validationSchema);

        if (validation) {
            setErrors(validation);
            return;
        }

        try {
            let response = await http.post("/User/authenticate", {
                email: user.email,
                password: user.password
            })
            if (response.status === 200) {
                console.log(response.data.accessToken, response.data.userId);
                localStorage.setItem('jwt', response.data.accessToken);
                window.location.href = "/"
            }
            else {
                ErrorMessage('Imejl adresa ili lozinka nisu ispravni, pokušajte ponovo', '');
            }
        }
        catch (err) {
            console.log(err);
            ErrorMessage('Imejl adresa ili lozinka nisu ispravni, pokušajte ponovo', '');
        }
    };

    return (
        <LoginContainer handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handleSubmit={handleSubmit} errors={errors} />
    )
}

export default Login;