import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOrderById, getOrderByStatus, getUserOrderHistory } from "../../State/Order/Action"
import { updatePayment } from "../../State/Payment/Action"
import { Alert, AlertTitle, Grid, Rating } from "@mui/material"
import { FormattedNumber } from 'react-intl';
import OrderTracker from "../Order/OrderTracker"
import AddressCard from "../AddressCard/AddressCard"
import { store } from "../../State/store"

const PaymentSuccess = () => {
    const [paymentId,setPaymentId] = useState()
    // const [orderSuccess,setOrderSuccess] = useState(null)
    // const [referenceId,setReferenceId] = useState()
    // const [paymentStatus,setPaymentStatus] = useState()
    const {orderId} = useParams()

    const dispatch = useDispatch()
    const {order} = useSelector(store=>store)

    useEffect(()=>{
        const data = {orderId:orderId}
        dispatch(getOrderById(data))
    },[])

    console.log("order:  ",order)
    console.log("orderId:  ",orderId)
    // console.log("orderSuccess:  ",orderSuccess)

    // useEffect(()=>{
    //     const newOrder = order.order?.orderItems.filter((item)=>{
    //         return item
    //     })
    //     setOrderSuccess(newOrder)
    // },[])

    // useEffect(()=>{
    //     const data = {
    //         status: "PLACED"
    //     }
    //     dispatch(getOrderByStatus(data))
    // },[])

    // useEffect(()=>{
    //     const urlParam = new URLSearchParams(window.location.search)
    //     setPaymentId(urlParam.get("razorpay_payment_id"))
    //     setPaymentId(urlParam.get("razorpay_payment_link_status"))

    // },[])

    // useEffect(()=>{
    //     if(paymentId){
    //         const data = {orderId,paymentId}
    //         dispatch(getOrderById(orderId))
    //         dispatch(updatePayment(data))
    //     }
    // },[orderId,paymentId])

    // console.log("paymentId: ",paymentId)

    return(
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" severity="success" sx={{mb:6,mt:3,width:"fit-content"}}>
                    <AlertTitle>{paymentId? "Thanh toán thành công":"Đặt hàng thành công"}</AlertTitle>
                </Alert>
            </div>

            <OrderTracker activeStep={1}/>

            <Grid container className="space-y-5 py-5 pt-20">
                {order.order?.orderItems.map((item)=>
                <Grid container item className="" sx={{alignItems:"center",justifyContent:"space-between"}}>
                    <Grid item xs={6}>
                        <div className="flex items-center">
                            <img className="w-[5rem] h-[5rem] object-cover object-top" 
                            src={item.product.imageUrl}
                            alt="" />
                            <div className="ml-5 space-y-2">
                                <p>
                                    {item.product.title}
                                </p>
                                <div className="opacity-50 text-xs font-semibold space-x-5">
                                    <span>
                                        Thương hiêu: {item.product.brand}
                                    </span>
                                    <span>
                                        <Rating sx={{ fontSize: 'inherit' }} value={4} name='half-rating' readOnly precision={.5}/>
                                    </span>
                                    <span>
                                        <FormattedNumber
                                            value={item.discountedPrice}
                                            style="currency"
                                            currency="VND"
                                            minimumFractionDigits={0}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <AddressCard address={order.order?.shippingAddress}/>
                    </Grid>
                </Grid>
                )}
            </Grid>
        </div>
    )
}

export default PaymentSuccess