import { Navigate } from "react-router-dom";
import Login from "../pages/login";

const PublicRoute = ({ url }) => {
    let token = localStorage.getItem('jwt');
    if (token) {
        return <Navigate to={url}></Navigate>
    }
    else return <Login></Login>
}

export default PublicRoute;