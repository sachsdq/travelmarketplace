import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Cart from '../components/Cart/Cart'
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
import Product from '../components/Product/Product'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import Profile from '../components/Profile/Profile'
import UpdateProfile from '../components/Profile/UpdateProfile'
import KhachSan from '../components/Product/KhachSan'
import ThueXe from '../components/Product/ThueXe'
import ThietBi from '../components/Product/ThietBi'
import Tour from '../components/Product/Tour'
import Checkout from '../components/Checkout/Checkout'
import Order from '../components/Order/Order'
import OrderDetail from '../components/Order/OrderDetail'
import OrderSummary from '../components/Checkout/OrderSummary'
import PaymentSuccess from '../components/Payment/PaymentSuccess'

const CustomerRouters = () => {
  return (
    <div>
        <div>
            <Navigation/>
        </div>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<HomePage/>}></Route>
            <Route path='/register' element={<HomePage/>}></Route>
            <Route path='/my-profile' element={<Profile/>}></Route>
            <Route path='/update-profile' element={<UpdateProfile/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            {/* <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product/>}></Route> */}
            <Route path='/product' element={<Product/>}></Route>
            <Route path='/product/hotel' element={<KhachSan/>}></Route>
            <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<KhachSan/>}></Route>
            <Route path='/product/rent' element={<ThueXe/>}></Route>
            <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<ThueXe/>}></Route>
            <Route path='/product/device' element={<ThietBi/>}></Route>
            <Route path='/product/tour' element={<Tour/>}></Route>
            <Route path='/product/:productId' element={<ProductDetails/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/account/order' element={<Order/>}></Route>
            <Route path='/account/order/:orderId' element={<OrderDetail/>}></Route>
            <Route path='/paymentmethod' element={<OrderSummary/>}></Route>
            <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>
        </Routes>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default CustomerRouters