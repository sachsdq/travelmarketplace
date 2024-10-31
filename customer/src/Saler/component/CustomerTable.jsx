import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { getAllCart, getCart } from '../../State/Cart/Action'
import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { store } from '../../State/store'
import { getUserOrderHistory } from '../../State/Order/Action'
import { getAllUser } from '../../State/Auth/Action'
import { getUserAddress } from '../../State/Address/Action';

const CustomerTable = () => {
  const dispatch = useDispatch()
  const {order} = useSelector(store=>store)
  const {auth} = useSelector(store=>store)
  const {address} = useSelector(store=>store)

  // console.log("order saler",order)
  // console.log("all user",auth)

  useEffect(()=>{
    dispatch(getUserAddress())
  },[dispatch])

  useEffect(()=>{
    dispatch(getAllUser())
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getUserOrderHistory())
  },[dispatch])

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Tất cả khách hàng"/>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell align="left">Tên</TableCell>
            <TableCell align="left">Tổng sản phẩm</TableCell>
            <TableCell align="left">Tổng tiền</TableCell>
            <TableCell align="left">Ngày đặt hàng</TableCell>
            <TableCell align="left">Địa chỉ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {cart.cart?.map((item) => ( */}
          {order.order?.map((order)=> (
            <TableRow
              // key={item.name}
              key={order.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Avatar 
                // src={item.imageUrl}
                >A</Avatar>
              </TableCell>
              <TableCell align="left">
                {/* {item.user} */}
                {auth.user?.map((user)=>(user?._id.toString().includes(order.user) ? user?.firstName+" "+user?.lastName : null))}
              </TableCell>
              <TableCell align="left">
                {/* {item.totalItem} */}
                {order?.totalItem}
              </TableCell>
              <TableCell align="left">
                {/* {item.totalPrice} */}
                <FormattedNumber
                  value={order?.totalDiscountedPrice}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
                
              </TableCell>
              <TableCell align="left">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell align="left">
              {address.address?.map((address)=>address._id.toString().includes(order.shippingAddress)
              ?address?.streetAddress+" "+address?.state+" "+address?.city+" "+address?.mobile:null)}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default CustomerTable