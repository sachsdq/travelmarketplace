import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { createOrder, getOrderById } from '../../State/Order/Action'
import { getUserById } from '../../State/Auth/Action'

const DeliveryAddressForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const querySearch = new URLSearchParams(location.search)
    const idParam = querySearch.get('id');
    const selectedCartItemIds = idParam.split('?')[0];
    const {auth} = useSelector(store=>store)
    const {order} = useSelector(store=>store)
    console.log("auth:  ",auth)
    // console.log("auth.user._id:  ",auth.user._id)
    // console.log("auth.user.address?.map((item)=>item?.firstName) ",auth.user.address?.map((item)=>item))
    console.log("cartItem id: ",selectedCartItemIds)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const address = {
            firstName:data.get("firstName"),
            lastName:data.get("lastName"),
            streetAddress:data.get("address"),
            city:data.get("city"),
            state:data.get("state"),
            zipCode:data.get("zip"),
            mobile:data.get("phoneNumber"),
        }
        // const orderData = {address,navigate}
        const shipAddress = address
        // const selectedCartItemIds = id
        const orderData = {shipAddress,selectedCartItemIds,navigate}
        dispatch(createOrder(orderData))
        console.log("address  ",address)
        console.log("shipAddress  ",shipAddress)
    }

    useEffect(()=>{
        // const data = {userId:auth.user._id}
        getUserById(auth.user._id)
    },[])

  return (
    <div>
        <Grid className='pt-5' container spacing={4}>
            <Grid xs={12} lg={5} className='border rounded-0-md shadow-md h-[30.5rem] overflow-y-scroll'>
                <div className='p-5 py-7 border-b cursor-pointer'>
                    {auth.user?.address.map((item)=><AddressCard address={item}/>)}
                    {/* <AddressCard address={order.order?.shippingAddress}/> */}
                    <Button sx={{mt:2,bgcolor:"RGB(145 85 253)"}} size='large' variant='contained'>Giao hàng tại đây</Button>
                </div>
            </Grid>

            <Grid item xs={12} lg={7}>
                <Box className="border rounded-s-md shadow-md p-5">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='firstName'
                                    name='firstName'
                                    label="Tên"
                                    fullWidth
                                    autoComplete='given-name'
                                    value={auth.user?.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='lastName'
                                    name='lastName'
                                    label="Họ"
                                    fullWidth
                                    autoComplete='given-name'
                                    value={auth.user?.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id='address'
                                    name='address'
                                    label="Địa chỉ"
                                    fullWidth
                                    autoComplete='given-name'
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='city'
                                    name='city'
                                    label="Tỉnh/Thành phố"
                                    fullWidth
                                    autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='state'
                                    name='state'
                                    label="Quận/Huyện"
                                    fullWidth
                                    autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='zip'
                                    name='zip'
                                    label="Mã bưu chính"
                                    fullWidth
                                    autoComplete='shipping postal-code'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    label="Số điện thoại"
                                    fullWidth
                                    autoComplete='given-name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button 
                                    sx={{py:1.5,mt:2,bgcolor:"RGB(145 85 253)"}} 
                                    size='large' 
                                    variant='contained'
                                    type='submit'
                                >
                                    Lưu địa chỉ
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>

    </div>
  )
}

export default DeliveryAddressForm