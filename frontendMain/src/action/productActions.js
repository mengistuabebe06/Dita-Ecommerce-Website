import {
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = ({seller = '', name = '', category = ''})=> async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try{
        const {data} = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
}

export const listProductCategories = ()=> async (dispatch) =>{
    dispatch({
        type: PRODUCT_CATEGORY_LIST_REQUEST
    })
    try{
        const {data} = await axios.get(`/api/products/categories`)
        dispatch({
            type: PRODUCT_CATEGORY_LIST_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: PRODUCT_CATEGORY_LIST_FAIL,
            payload: error.message
        })
    }
}

export const detailsProduct = (productId)=> async (dispatch)=>{
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    })
    try{
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const createProduct = () => async (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST})
    const {
        userSignin: {userinfo},
    } = getState();
    try {
        const { data } = await axios.post('/api/products',{},{
            headers: { Authorization: `${userinfo.token}` },
        })
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product
        })
    }catch (error){
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}
export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
        userSignin: {userinfo},
    } = getState();
    try {
        const { data } = await axios.put(`/api/products/${product._id}`, product, {
            headers: { Authorization: `${userinfo.token}` },
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
        userSignin: {userinfo},
    } = getState();
    try {
        const { data } = await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `${userinfo.token}` },
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
};