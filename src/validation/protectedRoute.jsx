import Login from "../pages/login";

const ProtectedRoute = ({ children }) => {
    let token = localStorage.getItem('jwt');
    if (token) {
        return children;
    }
    else {
        return <Login></Login>
    }
}

export default ProtectedRoute;