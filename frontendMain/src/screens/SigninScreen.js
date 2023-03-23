import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signin} from "../action/userActions";
import {userSigninReducer} from "../reducers/userReducers";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";

export default function SigninScreen(){
    //get the url of the and split it
    const { search } = useLocation();
    const searchSplit = search.split('=')[1];
    const redirect = search ? `/${searchSplit}` : '/';

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // get email and password from the form entered by the user
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userSignin = useSelector((state) => state.userSignin)
    const {userinfo, loading, error} = userSignin

    const submitHandler = (e) =>{
        e.preventDefault()
        //TODO: sign in
        dispatch(signin(email, password))
    };
    useEffect(() => {
        if(userinfo){
            navigate(redirect)
        }
    },[redirect,userinfo])
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">
                        Sing In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? { ' '} <Link to={`/register?redirect=${redirect}`}> Create New Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}