import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signin, register} from "../action/userActions";
import {userSigninReducer} from "../reducers/userReducers";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";

export default function RegisterScreen(){
    //get the url of the and split it
    const { search } = useLocation();
    const searchSplit = search.split('=')[1];
    const redirect = search ? `/${searchSplit}` : '/';

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // get email and password from the form entered by the user
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const userRegister = useSelector((state) => state.userRegister)
    const {userinfo, loading, error} = userRegister

    const submitHandler = (e) =>{
        e.preventDefault()
        //TODO: sign in
        if(password !== confirmpassword){
            alert('Password and Confirm password are not match')
        }else {
            dispatch(register(name, email, password))
        }

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
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="name"
                        id="name"
                        placeholder="Enter Name"
                        required
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
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
                    <label htmlFor="confirmpassword">Confirm password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        placeholder="Enter password"
                        required
                        onChange={(e)=> setConfirmPassword(e.target.value)}
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
                        Already have an account? { ' '} <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}