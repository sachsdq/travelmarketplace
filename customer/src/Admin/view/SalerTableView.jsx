import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCart, getCart } from '../../State/Cart/Action'
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { deleteUserById, getAllUser } from '../../State/Auth/Action'

const SalerTableView = () => {
  const [users, setUsers] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [authUserLoaded, setAuthUserLoaded] = useState(false);
  const dispatch = useDispatch()
  const {auth} = useSelector(store=>store)

  // console.log("all user",auth)

  useEffect(()=>{
    dispatch(getAllUser())
  },[dispatch])

  useEffect(() => {
    // lay tat ca nguoi dung vao state users de sap xep
    if (auth.user) {
      const data = auth.user?.filter((item) => {
        return item;
      });
      setUsers(data || []);
      setAuthUserLoaded(true);
    }
  }, [auth.user]);

  useEffect(() => {
    // sap xep tat ca nguoi dung bang ham sort theo ngay tao tai khoan thu tu tu ngay tao moi nhat - cu nhat
    if (authUserLoaded) {
    const sortedUsers = [...users].sort((a, b) => {
      const dateA = new Date(a.createAt);
      const dateB = new Date(b.createAt);
      return dateB.getTime() - dateA.getTime();
    });

    // lay toi da 5 tai khoan moi nhat
    setLatestUsers(sortedUsers.slice(0, 5));
  }
  }, [users,authUserLoaded]);

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Nhà bán hàng gần đây"/>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Tên</TableCell>
            {/* <TableCell align="left">Mật khẩu</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {auth.user?.slice(0,5).map((item) => ( */}
          {latestUsers.map((item) => (
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
              {/* <TableCell align="left">{item.password}</TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default SalerTableView