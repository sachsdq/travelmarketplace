import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useTheme } from '@mui/material'
import { Box, useMediaQuery } from '@mui/system'
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddCardIcon from '@mui/icons-material/AddCard';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OrderIcon from '@mui/icons-material/LocalAtm';
import Dashboard from './component/Dashboard';
import CreateProductForm from './component/CreateProductForm';
import ProductTable from './component/ProductTable';
import OrderTable from './component/OrderTable';
import CustomerTable from './component/CustomerTable';
import UpdateProduct from './component/UpdateProduct';
// import Profile from './component/Profile';

const menu = [
    {name: "Dashboard", path:"/saler",icon:<DashboardIcon className='text-orange-600 rounded'/>},
    {name: "Sản phẩm", path:"/saler/products",icon:<LocalMallIcon className='text-teal-300 rounded'/>},
    {name: "Khách hàng", path:"/saler/customers",icon:<PeopleIcon className='text-rose-600 rounded'/>},
    {name: "Đơn đặt hàng", path:"/saler/orders",icon:<OrderIcon className='text-yellow-500 rounded'/>},
    // {name: "Orders", path:"/saler/orders",icon:<DashboardIcon/>},
    {name: "Thêm sản phẩm", path:"/saler/product/create",icon:<AddCardIcon className='text-blue-500 rounded'/>},
    // {name: "Sửa sản phẩm", path:"/saler/updateproduct/:id",icon:<AddCardIcon/>},
    // {path:"/saler/profile"},
]

const Saler = () => {
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
    const [sideBarVisible,setSideBarVisible] = useState(false)
    const navigate = useNavigate()

    const drawer = (
        <Box
        sx={{
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            // border:"1px solid blue",
            height:"100%"
        }}>
            <>
            {/* {isLargeScreen && <Toolbar/>} */}
            <List>
                {menu.map((item,index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
                    <ListItemButton>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                    </ListItemButton>
                </ListItem>)}
            </List>
            </>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon className='text-rose-600 rounded'/>
                        </ListItemIcon>
                        <ListItemText>Tài khoản</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
  return (
    <div>
        <div className='relative flex h-[100vh]'>
            <CssBaseline/>
            <div className='shadow-lg shadow-gray-600 w-[15%] border border-r-gray-300 h-full fixed top-0'>
                {drawer}
            </div>
            <div className='w-[85%] h-full ml-[15%]'>
                <Routes>
                    <Route path='/' element={<Dashboard/>}></Route>
                    <Route path='/product/create' element={<CreateProductForm/>}></Route>
                    <Route path='/products' element={<ProductTable/>}></Route>
                    <Route path='/orders' element={<OrderTable/>}></Route>
                    <Route path='/customers' element={<CustomerTable/>}></Route>
                    <Route path='/updateproduct/:id' element={<UpdateProduct/>}></Route>
                    <Route path='/orders' element={<OrderTable/>}></Route>
                    {/* <Route path='/profile' element={<Profile/>}></Route> */}
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Saler