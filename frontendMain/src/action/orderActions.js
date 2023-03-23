import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";
import {CART_EMPTY} from "../constants/cartConstants";
import {PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS} from "../constants/productConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
        const {
            userSignin: { userinfo },
        } = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `${userinfo.token}`,
            },
        });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
        userSignin: { userinfo },
    } = getState();
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `${userinfo.token}` },
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch, getState) =>{
    dispatch({type: ORDER_MINE_LIST_REQUEST})
    const {
        userSignin: { userinfo },
    } = getState();
    try {
        const { data } = await axios('/api/orders/mine',{
            headers: { Authorization: `${userinfo.token}` },
        })
        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: data
        })
    }catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
}
export const listOrders = ({seller = ''}) => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
        userSignin: { userinfo },
    } = getState();
    try {
        const { data } = await axios.get(`/api/orders?seller=${seller}`, {
            headers: { Authorization: `${userinfo.token}` },
        });
        console.log(data);
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
        userSignin: {userinfo},
    } = getState();
    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: { Authorization: `${userinfo.token}` },
        });
        dispatch({ type: ORDER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
        userSignin: {userinfo},
    } = getState()
    try {
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: { Authorization: `${userinfo.token}` },
            }
        );
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
};