import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../State/store'
import { getOrderById, getOrderCancelled, getUserOrderHistory } from '../../State/Order/Action'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList';

// const orderStatus = [
//     {label:"On the Way", value:"on_the_way"},
//     {label:"Delivered", value:"delivered"},
//     {label:"Cancelled", value:"cancelled"},
//     {label:"Returned", value:"returned"},
// ]

const orderStatus = [
    {label:"Đã đặt hàng", value:"da_dat_hang",id:"PLACED"},
    {label:"Đang giao hàng", value:"dang_giao_hang",id:"SHIPPED"},
    {label:"Đã giao hàng", value:"da_giao_hang",id:"DELIVERED"},
    {label:"Đã hủy", value:"da_huy",id:"CANCELLED"},
    {label:"Đã trả hàng", value:"da_tra_hang",id:"RETURNED"},
]

const Order = () => {
    const [statusOrder,setStatusOrder] = useState("PLACED")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {order} = useSelector(store=>store)
    // console.log("my order: ",order)

    const handleFilter = (value, statusId)=>{
        const searchParams = new URLSearchParams(location.search)
    
        let filterValue = searchParams.getAll(statusId)
    
        if(filterValue.length>0 && filterValue[0].split(",").includes(value)){
          filterValue=filterValue[0].split(",").filter((item)=>item!==value)
    
          if(filterValue.length===0){
            searchParams.delete(statusId)
          }
        }
        else{
          filterValue.push(value)
        }
    
        if(filterValue.length>0){
          searchParams.set(statusId,filterValue.join(","))
        }
        const query = searchParams.toString()
        navigate({search:`?${query}`})
        
        setStatusOrder(statusId) //set status order khi checkbox tương ứng
      }
      console.log("status order click ",statusOrder)
      useEffect(()=>{
        if(statusOrder==="PLACED"){
          dispatch(getUserOrderHistory())
        } 
        else if(statusOrder==="CANCELLED"){
          dispatch(getOrderCancelled())
        }else{
          return
        }
        // setStatusOrder(statusOrder)
    },[dispatch,statusOrder])

  return (
    <div className='px-5 lg:px-20 py-5'>
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={2.5}>
                <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                    <h1 className='font-bold text-lg'>
                        <FilterListIcon/>Lọc
                    </h1>
                    <div className='space-y-4 mt-10'>
                        <h1 className='font-semibold'>Trạng thái đơn hàng</h1>
                        {orderStatus.map((option)=>
                            <div className='flex items-center'>
                                <input defaultValue={option.value} type='checkbox' className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                    onChange={()=> handleFilter(option.value, option.id)}
                                />
                                <label className='ml-3 text-sm text-gray-600' htmlFor={option.value}>
                                    {option.label}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </Grid>
            
            <Grid item xs={9}>
              <p className='font-semibold py-5'>{statusOrder==="PLACED"?"ĐƠN HÀNG ĐÃ ĐẶT":
                statusOrder==="CANCELLED"?"ĐƠN HÀNG ĐÃ HỦY":"CHƯA XỬ LÝ"}</p>
                <div className='space-y-5'>
                {order?.order?.map((order)=> order?.orderItems?.map((item)=><OrderCard orderClick={order} item={item}/>))}
                {/* <OrderCard/> */}
                
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Order