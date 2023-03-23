import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {detailsUser, updateUser} from "../action/userActions";
import {USER_UPDATE_RESET} from "../constants/userConstants";

export default function UserEditScreen(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const params = useParams();
    const { id: userId } = params;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() =>{
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    },[dispatch,navigate, successUpdate, user,userId])
    const submitHandler =(e) =>{
        e.preventDefault()
        //TODO: Dispatch the user id
        dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
    }

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Edit User {name}</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                </div>
                {loading ? <LoadingBox></LoadingBox>:
                error ? <MessageBox>{error}</MessageBox> :
                (
                <>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter User Name"
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter User Email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="isSeller">Is Seller</label>
                        <input
                            id="isSeller"
                            type="checkbox"
                            checked={isSeller}
                            onChange={(e) => setIsSeller(e.target.checked)}
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="isAdmin">Is Admin</label>
                        <input
                            id="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></input>
                    </div>
                    <div>
                        <button type="submit" className="primary">
                            Update
                        </button>
                    </div>
                </>
                )}
            </form>
        </div>
    )
}