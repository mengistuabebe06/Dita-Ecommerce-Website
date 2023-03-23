import {useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;
    return userinfo ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;