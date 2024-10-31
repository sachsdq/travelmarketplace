import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from '../Cart/CartItem'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { getCart } from '../../State/Cart/Action'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrderById } from '../../State/Order/Action'
import { store } from '../../State/store'
import PaymentModal from './PaymentModal'

const OrderSummary = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  // const [orderSuccess,setOrderSuccess] = useState(null)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get("order_id")
  const {cart} = useSelector(store=>store)
  const {order} = useSelector(store=>store)

  console.log("orderId summary: ",orderId)
  // console.log("ordersuccess ",orderSuccess)

  const handleOpen = ()=> {
    if(location.pathname==="/paymentmethod"){
        navigate("/paymentmethod")
    }
    setOpenPaymentModal(true)
  }

  const handleClose = ()=> {
    setOpenPaymentModal(false)
  }

//   useEffect(()=>{
//     const newOrder = order.order?.orderItems.filter((item)=>{
//         return item
//     })
//     setOrderSuccess(newOrder)
// },[])
  
  useEffect(()=>{
    dispatch(getCart())
  },[cart.updateCartItem,cart.deleteCartItem])
  
  useEffect(()=>{
    dispatch(getOrderById(orderId))
},[])
  // useEffect(()=>{
  //   if(auth.user){
  //     handleClose()
  //   }
  //   if(location.pathname==="/login" || location.pathname==="/register"){
  //     navigate(-1)
  //   }
  // },[auth.user])

  return (
    <div>
      <div className='p-5 shadow-lg rounded-s-md border'>
        <AddressCard address={order.order?.shippingAddress}/>
      </div>

      <div>
      <div className='lg:grid grid-cols-3 relative'>
        <div className='col-span-2'>
          {/* {[1,1,1,1,1,1,1].map((item)=> <CartItem/>)} */}
          {order.order?.orderItems.map((item)=> <CartItem item={item}/>)}
          {/* <CartItem item={orderSuccess}/> */}
        </div>

        <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
          <div className='border'>
            <p className='uppercase font-bold opacity-60 pb-4'>Tóm tắt đơn hàng</p>
            <hr/>
            <div className='space-y-3 font-semibold mb-10'>
              <div className='flex justify-between pt-3 text-black'>
                <span>Tống tiền chưa giảm</span>
                <span>
                  {/* {cart.cart?.totalPrice} vnđ */}
                  <FormattedNumber
                        value={order.order?.totalPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                </span>
              </div>
              <div className='flex justify-between pt-3 '>
                <span>Giảm giá</span>
                <span className='text-green-600'>
                  {/* {cart.cart?.discount} vnđ */}
                  <FormattedNumber
                        value={order.order?.discount}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                </span>
              </div>
              <div className='flex justify-between pt-3'>
                <span>Phí vận chuyển</span>
                <span className='text-green-600'>Free</span>
              </div>
              <div className='flex justify-between pt-3 font-bold'>
                <span>Tổng tiền đã giảm</span>
                <span className='text-green-600'>
                  {/* 100000000 vnđ */}
                  {/* {cart.cart?.totalDiscountedPrice} vnđ */}
                  <FormattedNumber
                        value={order.order?.totalDiscountedPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                </span>
              </div>
            </div>

            <Button onClick={handleOpen} variant='contained' className="w-full mt-5" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd'}}>
                Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
    <PaymentModal handleClose={handleClose} open={openPaymentModal}/>
    </div>

    

    
  )
}

export default OrderSummary