import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCart, getCart } from '../../State/Cart/Action'
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { deleteUserById, getAllUser } from '../../State/Auth/Action'

const CustomerTable = () => {

  const dispatch = useDispatch()
  const {auth} = useSelector(store=>store)

  // console.log("all user",auth)

  const handleUserDelete = (userId) =>{
    dispatch(deleteUserById(userId))
  }

  useEffect(()=>{
    dispatch(getAllUser())
  },[])

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Tất cả nhà bán hàng"/>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Tên</TableCell>
            <TableCell align="left">Mật khẩu</TableCell>
            <TableCell align="left">Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auth.user?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              {/* <TableCell align='left' scope="row">
                {item.title}
              </TableCell> */}
              <TableCell align="left">{item._id}</TableCell>
              <TableCell align="left">{item.firstName} {item.lastName}</TableCell>
              <TableCell align="left">{item.password}</TableCell>
              <TableCell align="left">
                <Button onClick={()=>handleUserDelete(item._id)} variant='outlined'>Xóa</Button>
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