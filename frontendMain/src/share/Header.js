import {Link, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../action/userActions";
import SearchBox from "../components/SearchBox";
import {useEffect, useState} from "react";
import {listProductCategories} from "../action/productActions";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

function Header(){
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    const userSignin = useSelector((state) => state.userSignin)
    const {userinfo} = userSignin

    const dispatch = useDispatch()
    const signoutHandler = () =>{
        dispatch(signout())
    }

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    useEffect(()=>{
        dispatch(listProductCategories())
    }, [dispatch])
    return(
        <div>
            <header className="row">
                <div>
                    <button
                        type="button"
                        className="open-sidebar"
                        onClick={() => setSidebarIsOpen(true)}
                    >
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link className="brand" to="/">Dita</Link>
                </div>
                <div>
                    <SearchBox></SearchBox>
                </div>
                <div>
                    <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                    </Link>
                    {
                        userinfo ? (
                                <div className="dropdown">
                                    <Link to="#" >{userinfo.name} <i className="fa fa-caret-down"></i>{ ' ' }</Link>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to="/profile">User Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/orderhistory">Order History  </Link>
                                        </li>
                                        <li>
                                            <Link to="#signout" onClick={signoutHandler}>
                                                Sign Out
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) :
                            (
                                <Link to="/signin">Sign In</Link>
                            )}
                    {userinfo && userinfo.isSeller && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Seller <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/productlist/seller">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist/seller">Orders</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    {userinfo && userinfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">
                                Admin <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">Orders</Link>
                                </li>
                                <li>
                                    <Link to="/userlist">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
            <aside className={sidebarIsOpen ? 'open' : ''}>
                <ul className="categories">
                    <li>
                        <strong>Categories</strong>
                        <button onClick={() => setSidebarIsOpen(false)}
                                className="close-sidebar"
                                type="button"
                        >
                            <i className="fa fa-close"></i>
                        </button>
                    </li>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                        categories.map((c) => (
                            <li key={c}>
                                <Link
                                    to={`/search/category/${c}`}
                                    onClick={() => setSidebarIsOpen(false)}
                                >
                                    {c}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </aside>
        </div>
    )
}
export default Header