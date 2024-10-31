import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { store } from '../../State/store'
import { getAllCart } from '../../State/Cart/Action'
import { Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { getAllOrders, getUserOrderHistory } from '../../State/Order/Action'
import { getAllUser } from '../../State/Auth/Action';
import { getUserAddress } from '../../State/Address/Action';

const OrderTable = () => {
  const dispatch = useDispatch()
  const {order} = useSelector(store=>store)
  const {auth} = useSelector(store=>store)
  const {address} = useSelector(store=>store)

  // console.log("order saler:",order )
  // console.log("user saler:",auth )
  // console.log("user address:",address )

  useEffect(()=>{
    dispatch(getUserAddress())
  },[])

  useEffect(()=>{
    dispatch(getAllUser())
  },[dispatch])

  useEffect(()=>{
    dispatch(getUserOrderHistory())
  },[dispatch])

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader className='font-bold' title="Tất cả Đơn đặt hàng"/>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên khách hàng</TableCell>
            <TableCell align="left">Ngày đặt hàng</TableCell>
            <TableCell align="left">Tổng số lượng</TableCell>
            <TableCell align="left">Tổng tiền</TableCell>
            <TableCell align="left">Giảm giá</TableCell>
            <TableCell align="left">Địa chỉ giao hàng</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.order?.map((item)=>(
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                {auth.user?.map((user)=>(user?._id.toString().includes(item.user) ? user?.firstName+" "+user?.lastName : null))}
              </TableCell>
              <TableCell align="left">{new Date(item.orderDate).toLocaleDateString()}</TableCell>
              <TableCell align="left">{item.totalItem}</TableCell>
              <TableCell align="left">
                <FormattedNumber
                  value={item.totalDiscountedPrice}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
              </TableCell>
              <TableCell align="left">
                <FormattedNumber
                  value={item.discount}
                  style="currency"
                  currency="VND"
                  minimumFractionDigits={0}
                />
              </TableCell>
              <TableCell align="left">
              {address.address?.map((address)=>address._id.toString().includes(item.shippingAddress)
              ?address?.streetAddress+" "+address?.state+" "+address?.city+" "+address?.mobile:null)}
              </TableCell>
              <TableCell align="left">
              {item.orderStatus==="PLACED" ? "Đã đặt hàng" : null}
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default OrderTable