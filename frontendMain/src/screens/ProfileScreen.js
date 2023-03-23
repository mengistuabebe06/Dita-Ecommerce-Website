import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {detailsOrder} from "../action/orderActions";
import {detailsUser, updateUserProfile} from "../action/userActions";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";

export default function ProfileScreen(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userSignin = useSelector((state) => state.userSignin)
    const { userinfo } = userSignin
    const userDetails = useSelector((state) => state.userDetails)
    const {loading, error, user} = userDetails

    const dispatch = useDispatch()

    const userUpdateProfile = useSelector((state) => state.updateProfile)
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile

    useEffect(() =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userinfo._id))
        }else {
            setName(user.name)
            setEmail(user.email)
            if(user.seller){
                setSellerName(user.seller.name)
                setSellerLogo(user.seller.logo)
                setSellerDescription(user.seller.description)
            }
        }

    },[dispatch, userinfo._id, user, sellerName, sellerLogo, sellerDescription])
    const submitHandler = (e) =>{
        e.preventDefault()
        //TODO: dispatch upadete profile
        if(password !== confirmPassword){
            alert('Password and Confirm Password are not match')
        }else {
            dispatch(updateUserProfile({userId: user._id, name,email,password, sellerName, sellerLogo,sellerDescription}))
        }
    }
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    : error ? <MessageBox>{error}</MessageBox>
                    :
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && (
                            <MessageBox variant="success">Profile Updated successfully</MessageBox>
                        )}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="email">Name</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="text"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="confirmpassword">Confrim Password</label>
                            <input
                                id="confirmpassword"
                                type="text"
                                placeholder="Enter confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></input>
                        </div>
                        {userinfo.isSeller && (
                            <>
                                <h1>Seller</h1>
                                <div>
                                    <label htmlFor="sellerName">Seller Name</label>
                                    <input
                                        id="sellerName"
                                        type="text"
                                        placeholder="Enter Seller Name"
                                        value={sellerName}
                                        onChange={(e) => setSellerName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="sellerLogo">Seller Logo</label>
                                    <input
                                        id="sellerLogo"
                                        type="text"
                                        placeholder="Enter Seller Logo"
                                        value={sellerLogo}
                                        onChange={(e) => setSellerLogo(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="sellerDescription">Seller Description</label>
                                    <input
                                        id="sellerDescription"
                                        type="text"
                                        placeholder="Enter Seller Description"
                                        value={sellerDescription}
                                        onChange={(e) => setSellerDescription(e.target.value)}
                                    ></input>
                                </div>
                            </>
                        )}
                        <label />
                        <button className="primary" type="submit">
                            Update
                        </button>
                    </>

                }
            </form>
        </div>
    )
}