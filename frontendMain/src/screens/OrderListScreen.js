import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, listOrders} from "../action/orderActions";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useLocation, useNavigate} from "react-router-dom";
import {PRODUCT_DELETE_RESET} from "../constants/productConstants";
import {ORDER_DELETE_RESET} from "../constants/orderConstants";
import {deleteProduct} from "../action/productActions";

export default function OrderListScreen(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { pathname } = useLocation();
    const sellerMode = pathname.indexOf('/seller') >= 0;

    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;

    const orderList = useSelector((state) => state.orderList)
    const {error, loading, orders} = orderList
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;
    useEffect(()=>{
        if (successDelete) {
            dispatch({ type: ORDER_DELETE_RESET });
        }
        dispatch(listOrders({seller: sellerMode ? userinfo._id : ''}))
    },[dispatch, successDelete])

    const deleteHandler = (order)=>{
        //TODO: dispatch delete handler
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id));
        }
    }
    return(
        <div>
            <h1>Orders </h1>
            {loading?
                <LoadingBox></LoadingBox>
                : error? <MessageBox>{error}</MessageBox>
                    :
                    (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : 'NO'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'NO'}</td>
                                    <td>
                                        <button type="button" className="small" onClick={()=>{navigate(`/order/${order._id}`)}}>
                                            Details
                                        </button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(order)}
                                        >
                                            Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )
            }
        </div>
    )
}