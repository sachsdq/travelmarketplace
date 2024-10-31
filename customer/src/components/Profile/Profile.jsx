import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Avatar, Box, Grid } from '@mui/material';
import CartItem from '../Cart/CartItem';
import defautavatar from '../img/avataricon.jpg'
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../State/Auth/Action';
import { store } from '../../State/store';
import { deepPurple } from '@mui/material/colors';


const Profile = () => {
    const jwt = localStorage.getItem("jwt")
    const {auth} = useSelector(store=>store)
    const dispatch = useDispatch()

useEffect(()=>{
    if(jwt){
        dispatch(getUser(jwt))
    }
  },[jwt, auth.jwt])

const navigate = useNavigate()

// const user = {
//     name: 'dinh quoc sach',
//     email:'sach@gmail.com',
//     password:'.......',
//     phone:'123456',
//     address:'binh thanh, tp.hcm',
//     orders: [
//         {
//             _id:'01',
//             createdAt:'22/04/2024',
//             totalPrice:'1000',
//             status:'đã nhận hàng',
//             products:[
//                 {
//                     _id:'01',
//                     name:'giay sneaker',
//                     quantity:'2',
//                 }
//             ]
//         }
//     ]
// }

// const [avatar, setAvatar] = useState({defautavatar}); // State lưu trữ URL avatar

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setAvatar(e.target.result); // Cập nhật state avatar
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  return (
    <div className="grid grid-rows-1 lg:grid-rows-1 gap-x-8 gap-y-8 px-4 pt-4">
        {/* thong tin ca nhan */}
        {auth.user?.firstName ? (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 px-4 pt-10'>
            <div>
            {/* {auth.user?.firstName ? ( */}
                <Box className='pl-12'>
                    <Avatar className='text-white'
                    sx={{width:200, height:200, 
                        bgcolor:deepPurple[500],
                        color:"white",
                        cursor:"pointer"}}
                    >
                        {auth.user?.firstName[0].toUpperCase()}
                    </Avatar>
                </Box>
                {/* ):(
                    <div></div>
                )} */}
                {/* <span className="">Thay đổi Avatar</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" /> */}
            </div>
            <div className='w-full col-span-2'>
                <h1 className='font-bold pb-4 text-lg'>
                    Thông tin tài khoản
                    <Link to='/update-profile'><EditIcon className='h-full w-full pl-2 border cursor-pointer'/></Link>
                    
                </h1>
                <div className="space-y-2 w-full">
                    <table 
                        style={{ 
                            tableLayout: 'fixed', 
                            width: '100%',
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px'
                        }}
                    >
                        <tr>
                            <td className="font-semibold" style={{ wordWrap: 'break-word' }}>Tên người dùng:</td>
                            <td className="opacity-70" style={{ wordWrap: 'break-word' }}>{auth.user.firstName} {auth.user.lastName}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold" style={{ wordWrap: 'break-word' }}>Email:</td>
                            <td className="opacity-70" style={{ wordWrap: 'break-word' }}>{auth.user.email}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold" style={{ wordWrap: 'break-word' }}>Mật khẩu:</td>
                            <td className="opacity-70" style={{ wordWrap: 'break-word' }}>{auth.user.password}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold" style={{ wordWrap: 'break-word' }}>Số điện thoại:</td>
                            <td className="opacity-70" style={{ wordWrap: 'break-word' }}>{auth.user.phone || "..."}</td>
                        </tr>
                    </table>
                    {/* <table  border="1" cellspacing="2" cellpadding="5" width="100%"> */}
                        {/* <tr>
                            <td className='font-semibold'>Tên người dùng:</td>
                            <td className='opacity-70'>{auth.user.firstName} {auth.user.lastName}</td>
                        </tr>
                        <tr>
                            <td className='font-semibold'>Email:</td>
                            <td className='opacity-70'>{auth.user.email}</td>
                        </tr>
                        <tr>
                            <td className='font-semibold'>Mật khẩu:</td>
                            <td className='opacity-70'>{auth.user.password}</td>
                        </tr>
                        <tr>
                            <td className='font-semibold'>Số điện thoại:</td>
                            <td className='opacity-70'>{auth.user.phone || "..."}</td>
                        </tr> */}
                        {/* <tr>
                            <td className='font-semibold'>Đại chỉ:</td>
                            <td className='opacity-70'>{auth.user.address || "..."}</td>
                        </tr> */}
                    {/* </table> */}
                </div>
            </div>
        </div>
        ):(
            <div></div>
        )}

        {/* san pham da luu */}
        {/* <div className='grid grid-cols-1'>
            <h2 className='font-semibold text-lg pb-4'>Sản phẩm đã lưu</h2>
            <div className=""> */}
                {/* {[1,1,1,1,1,1,1].map((item)=> <CartItem/>)} */}
                {/* Hiển thị danh sách san phâm */}
                {/* {user.orders && user.orders.map(order => ( */}
                {/* <div key={order._id}> */}
                    {/* <h3>Đơn hàng #{order._id}</h3> */}
                    {/* <p>Ngày đặt hàng: {order.createdAt}</p> */}
                    {/* <p>Tổng tiền: {order.totalPrice}</p> */}
                    {/* <p>Trạng thái: {order.status}</p> */}
                    {/* Hiển thị chi tiết các sản phẩm trong đơn hàng */}
                    {/* <ul> */}
                    {/* {order.products.map(product => ( */}
                        {/* <li key={product._id}> */}
                        {/* {product.name} x {product.quantity} */}
                        {/* </li> */}
                    {/* ))} */}
                    {/* </ul> */}
                {/* </div> */}
                {/* ))} */}
            {/* </div>
        </div> */}

    </div>
  );
};

export default Profile;