import { Button, Grid, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import { store } from '../../State/store';
import { API_BASE_URL, api } from "../../config/apiConfig"
import { cancelledOrders, getOrderById, getOrderCancelled, getUserOrderHistory, placedOrders } from '../../State/Order/Action';
import OrderDetail from './OrderDetail';

const OrderCard = ({item,orderClick}) => {
    const [orders, setOrders] = useState([]);
    const [isOpen,setIsOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {order} = useSelector(store=>store)
    // console.log("my orders: ",order)
    
    // const orderId = orderClick._id
    // console.log("orderId click: ",orderId)

    const handleOrderClick = () => {
        console.log("orders click: ",orderClick)
        navigate(`/account/order/${orderClick?._id}`);
    };

    const handleCancelledOrder=()=>{
        const data = {
            orderId: orderClick?._id
        }
        dispatch(cancelledOrders(data))
        setIsOpen(false)
    }

    const handleReOrder=()=>{
        const data = {
            orderId: orderClick?._id
        }
        dispatch(placedOrders(data))
        setIsOpen(false)
    }

    // useEffect(()=>{
    //     dispatch(getUserOrderHistory())
    // },[dispatch,orderStatus])

//     const popupRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (popupRef.current && !popupRef.current.contains(event.target)) {
//         onCancel();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onCancel]);

//   if (!isOpen) return null;

  return (
    // <div>
    //     {orders.map((order) => ( key={order._id} onClick={() => handleOrderClick(order._id)}
        <div  className='p-5 shadow-md hover:shadow-2xl border'>
            <Grid onClick={handleOrderClick} container className='space-y-5'>
            {/* {order.order?.orderItems.map((item)=> */}
                <Grid className='p-2' container item spacing={2} sx={{justifyContent:"space-between"}}>
                    <Grid item xs={6}>
                        <div className='flex cursor-pointer'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top' src={item?.product?.imageUrl} alt=''/>
                            <div className='ml-5 space-y-2'>
                                <p>{item?.product?.title}</p>
                                <p className='opacity-50 text-xs font-semibold'>
                                    Đánh giá: <Rating sx={{ fontSize: 'inherit' }} value={4} name='half-rating' readOnly precision={.5}/>
                                </p>
                                <p className='opacity-50 text-xs font-semibold'>Thương hiệu: {item?.product?.brand}</p>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={2}>
                        <p>
                            <FormattedNumber
                                value={item?.discountedPrice}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                            />
                        </p>
                    </Grid>

                    <Grid item xs={4}>
                        {true && <div>
                            <p>
                                <AdjustIcon sx={{width:"15px",height:"15px"}} className='text-green-600 mr-2 text-sm'/>
                                <span>
                                    {/* Đang giao hàng vào ngày 15/6 */}
                                    {orderClick.orderStatus==="CANCELLED"?"Đã hủy đơn hàng":"Đã đặt hàng"}
                                </span>
                            </p>
                            <p className='text-xs'>
                                {/* Đơn hàng của bạn đã được giao thành công */}
                                {orderClick.orderStatus === "PLACED" ? (
                                <p>Đã đặt hàng vào ngày {new Date(orderClick.orderDate).toLocaleDateString()}</p>
                                ) : (
                                <p></p>
                                )}
                            </p>
                        </div>}
                        {false && <p>
                            <span>
                                Dự kiến giao vào ngày 15/6
                            </span>
                        </p>}
                    </Grid>
                </Grid>
            {/* )} */}
            </Grid>
            <div>
                <Button onClick={()=>setIsOpen(true)} variant='contained'>{orderClick.orderStatus==="PLACED"?"Hủy Đơn hàng":"Đặt lại"}</Button>
            </div>
                {isOpen===true? 
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className='text-lg font-medium mb-4'>{orderClick.orderStatus==="PLACED"? "Xác nhận hủy đơn hàng" : "Xác nhận đặt lại đơn hàng"}</h3>
                        <p className='mb-6'>{orderClick.orderStatus==="PLACED"? "Bạn có chắc chắn muốn hủy đơn hàng này?":"Bạn có chắc chắn muốn đặt lại đơn hàng này?"}</p>
                        <div className="flex justify-end">
                            <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2' 
                            onClick={()=>setIsOpen(false)}>
                                Hủy
                            </button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-md' 
                            onClick={orderClick.orderStatus==="PLACED"? handleCancelledOrder : handleReOrder}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                : null
                }
        </div>
    //     ))}
    // </div>
  )
}

export default OrderCard