import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    productCategoryListReducer,
    productCreateReducer, productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer
} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";
import {
    userDeleteReducer,
    userDetailsReducer, userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer, userUpdateReducer
} from "./reducers/userReducers";
import {
    orderCreateReducer, orderDeleteReducer, orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer
} from "./reducers/orderReducers";

// const initialState = {}
const initialState = {
    // session of user data
    userSignin: {
        userinfo: localStorage.getItem('userinfo')
        ? JSON.parse(localStorage.getItem('userinfo'))
        : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'TeleBirr',
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    userDetails: userDetailsReducer,
    orderMineList: orderMineListReducer,
    updateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    productDelete: productDeleteReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productCategoryList: productCategoryListReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose
const store = createStore(
        reducer,
        initialState,
        composeEnhancer(applyMiddleware(thunk))
)

export default store