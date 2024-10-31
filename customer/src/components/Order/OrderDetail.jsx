import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid, Rating } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { getOrderById } from '../../State/Order/Action'
import { store } from '../../State/store'

const OrderDetail = () => {
    const orderId = useParams()
    const dispatch = useDispatch()
    const {order} = useSelector(store=>store)
    // const data = {orderId:orderId}
    console.log("orderId: ",orderId)
    console.log("order by id: ",order)
//     const { orderIds } = useParams();
// const orderIdArray = orderIds.split(',');

    useEffect(()=>{
        // const data = {orderId:orderId}
        dispatch(getOrderById(orderId))
    },[])

  return (
    <div className='px-5 lg:px-20 py-5'>
        <div>
            <h1 className='font-bold text-xl py-7'>Địa chỉ giao hàng</h1>
            <AddressCard address={order.order?.shippingAddress}/>
        </div>

        <div className='py-20'>
            <OrderTracker activeStep={3}/>
        </div>

        <Grid className='space-y-5' container>
            {order.order?.orderItems?.map((item)=>
                <Grid item container className='shadow-xl rounded-md p-5 border' sx={{alignItems:"center",justifyContent:"space-between"}}>
                    <Grid item xs={6}>
                        <div className='flex items-center space-x-4'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top'
                            src={item.product.imageUrl} alt=''/>
                            <div className='space-y-2 ml-5'>
                                <p className='font-semibold'>{item.product.title}</p>
                                <p className=''>
                                    Đánh giá: <Rating sx={{fontSize:"inherit"}} value={4} name='half-rating' readOnly precision={.5}/>
                                </p>
                                <p>Thương hiêu: {item.product.brand}</p>
                                <p>
                                    <FormattedNumber
                                        value={item.discountedPrice}
                                        style="currency"
                                        currency="VND"
                                        minimumFractionDigits={0}
                                    />
                                </p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item>
                        <Box sx={{color:deepPurple[500]}}>
                            <StarBorderIcon sx={{fontSize:"2rem"}} className='px-2'/>
                            <span>Đánh giá và Bình luận sản phẩm</span>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Grid>
    </div>
  )
}

export default OrderDetail