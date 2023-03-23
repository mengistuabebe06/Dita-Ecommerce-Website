import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createOrder, deliverOrder, detailsOrder} from "../action/orderActions";
import {useEffect} from "react";
import {ORDER_CREATE_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";

export default function OrderScreen(){
    //extract  the order id from the url
    const params = useParams();
    const { id: orderId } = params;

    //get the order data from database => store => ui
    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, loading, error} = orderDetails
    const dispatch = useDispatch()
    const userSignin = useSelector((state) => state.userSignin);
    const { userinfo } = userSignin;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;
    useEffect(()=>{
        if(!order || successDeliver || (order && order._id !== orderId)){
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId))
        }

    },[dispatch,orderId, successDeliver, order])

    const deliverHandler = () =>{
        dispatch(deliverOrder(order._id))
    }
    return loading ? (<LoadingBox></LoadingBox>)
        : error ? (<MessageBox>{error}</MessageBox>)
        : (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{order.shippingAddress.fullName}
                                    <strong>Address:</strong>{order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered? <MessageBox variant="primary">Delivered at {order.deliveredAt}</MessageBox>
                                : <MessageBox variant="danger"> Not Delivered</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>PaymentMethod:</strong>{order.paymentMethod}
                                </p>
                                {order.isPaid? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                                    : <MessageBox variant="danger"> Not Paid</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                                {userinfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                        {loadingDeliver && <LoadingBox></LoadingBox>}
                                        {errorDeliver && (
                                            <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                        )}
                                        <button
                                            type="button"
                                            className="primary block"
                                            onClick={deliverHandler}
                                        >
                                            Deliver Order
                                        </button>
                                    </li>
                                )}
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}