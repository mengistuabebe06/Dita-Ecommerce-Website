import {useDispatch, useSelector} from "react-redux";
import LoadingBox from "../share/LoadingBox";
import MessageBox from "../share/MessageBox";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {listOrderMine} from "../action/orderActions";

export default function OrderHistoryScreen(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderMineList = useSelector((state) => state.orderMineList)
    const {loading, error, orders} = orderMineList

    useEffect(()=>{
        dispatch(listOrderMine())
    },[dispatch])
    return(
        <div>
            <h1>Order History </h1>
            {loading?
                <LoadingBox></LoadingBox>
            : error? <MessageBox>{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 'NO'}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'NO'}</td>
                            <td>
                                <button type="button" className="small" onClick={()=>{navigate(`/order/${order._id}`)}}>
                                    Details
                                </button>
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