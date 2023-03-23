import {useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";

const AdminRoute = ({ children }) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;
    return userinfo && userinfo.isAdmin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;