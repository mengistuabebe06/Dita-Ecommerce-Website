import data from "./data";
import Product from "./components/Product";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Header from "./share/Header";
import Footer from "./share/Footer";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PayementMethodScreen from "./screens/PayementMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchScreen from "./screens/SearchScreen";
import {useState} from "react";

function App() {

  return (
      <BrowserRouter>
      <div className="grid-container">
          <Header></Header>

        <main>
            <Routes>
            <Route path="/" element={<HomeScreen/>}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route exact path="/product/:id/edit" element={<ProductEditScreen />}></Route>
            <Route path='/signin' element={<SigninScreen/>}></Route>
            <Route path='/register' element={<RegisterScreen/>}></Route>
            <Route path="/cart/:id?" element={<CartScreen />}></Route>
            <Route path='/shipping' element={<ShippingAddressScreen/>}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={< OrderScreen />}></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
            <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>}/>
            <Route path="/payment" element={<PayementMethodScreen />}></Route>
            {/*    Admin routes*/}
            <Route exact path="/productlist" element={<AdminRoute><ProductListScreen /></AdminRoute>}/>
            <Route exact path="/orderlist" element={<AdminRoute><OrderListScreen /></AdminRoute>}/>
            <Route exact path="/userlist" element={<AdminRoute> <UserListScreen/> </AdminRoute>}></Route>
            <Route exact path="/user/:id/edit" element={<AdminRoute> <UserEditScreen/> </AdminRoute>}></Route>
            {/*    Seller Routes */}
            <Route exact path="/productlist/seller" element={<SellerRoute><ProductListScreen /></SellerRoute>}/>
            <Route exact path="/orderlist/seller" element={<SellerRoute><OrderListScreen /></SellerRoute>}/>
            <Route path="/seller/:id" element={< SellerScreen/>}></Route>
            {/*    search  and categories routes by name*/}
            <Route path="/search/name/:name?" element={< SearchScreen/>}></Route>
            <Route path="/search/category/:category" element={< SearchScreen/>}></Route>
            <Route path="/search/category/:category/name/:name" element={< SearchScreen/>}></Route>
            </Routes>
        </main>
          <Footer></Footer>
      </div>
      </BrowserRouter>
  );
}

export default App;
