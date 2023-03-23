import {useSelector} from "react-redux";
import {Navigate, Route} from "react-router-dom";

const SellerRoute = ({ children }) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;
    return userinfo && userinfo.isSeller ? children : <Navigate to="/signin" />;
};

export default SellerRoute;