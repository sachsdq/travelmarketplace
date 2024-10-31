import React from 'react'
import {Grid, Typography, Button, Link} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from '../img/tiktokIcon.svg'
import { useNavigate } from 'react-router-dom';

// import { Link } from '@mui/icons-material'

const Footer = () => {
    const navigate = useNavigate()
  return (
    <div>
        <Grid className='bg-gray-900 text-white text-center mt-10' 
        container sx={{bgcolor:'bg-gray-900', color:'white', py:3}}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5 font-bold' variant='h6'>Về TravelMarketPlace</Typography>
                <nav>
                    <ul class="flex justify-center flex-col space-y-4">
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Cách đặt sản phẩm</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Trợ giúp</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Liên hệ</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Đối tác</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Về chúng tôi</a>
                    </li>
                    </ul>
                </nav>
                {/* <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Cách đặt sản phẩm</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Trợ giúp</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Liên hệ</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Đối tác</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Về chúng tôi</Button>
                </div> */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5 font-bold' variant='h6'>Sản phẩm</Typography>
                <nav>
                    <ul class="flex justify-center flex-col space-y-4">
                    <li class="mx-4">
                        <a onClick={()=>navigate('/product/')} href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Tất cả khách sạn</a>
                    </li>
                    <li class="mx-4">
                        <a onClick={()=>navigate('/product/hotel')} href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Khách sạn</a>
                    </li>
                    <li class="mx-4">
                        <a onClick={()=>navigate('/product/rent')} href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Xe cho thuê</a>
                    </li>
                    <li class="mx-4">
                        <a onClick={()=>navigate('/product/device')} href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Trang thiết bị</a>
                    </li>
                    <li class="mx-4">
                        <a onClick={()=>navigate('/product/tour')} href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Tour du lịch</a>
                    </li>
                    </ul>
                </nav>
                {/* <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Tất cả</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Khách sạn</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Xe cho thuê</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Trang thiết bị</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Tour du lịch</Button>
                </div> */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5 font-bold' variant='h6'>Khác</Typography>
                <nav>
                    <ul class="flex justify-center flex-col space-y-4">
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">TravelMarketPlace Blog</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Liên kết bán hàng</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Chính sách và Quyền riêng tư</a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">Điều khoản và Dịch vụ</a>
                    </li>
                    </ul>
                </nav>
                {/* <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>TravelMarketPlace Blog</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Liên kết bán hàng</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Chính sách & quyền riêng tư</Button>
                </div>
                <div>
                <Button className='pb-5 opacity-50 normal-case hover:bg-white' variant='h6' gutterBottom>Điều khoản và dịch vụ</Button>
                </div> */}
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography className='pb-5 font-bold' variant='h6'>Mạng xã hội</Typography>
                <nav>
                    <ul class="flex justify-center flex-col space-y-4">
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">
                            <FacebookIcon className='text-blue-500'/> Facebook
                        </a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">
                            <InstagramIcon className='text-rose-600'/> Instagram
                        </a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">
                            <YouTubeIcon className='text-red-600'/> Youtube
                        </a>
                    </li>
                    <li class="mx-4">
                        <a href="#" class="hover:text-gray-400 hover:border-b-2 hover:border-gray-400 pb-1 transition-colors duration-300">
                            TikTok
                        </a>
                    </li>
                    </ul>
                </nav>
            </Grid>
            <Grid className='pt-20' item xs={12}>
                <Typography variant='body2' conponent='p' align='center'>
                    &copy; 2024 Travelmarketplace, All right reserved.
                </Typography>
                {/* <Typography variant='body2' conponent='p' align='center'>
                    Made with love by me.
                </Typography>
                <Typography variant='body2' conponent='p' align='center'>
                    Icon made by{' '}
                    <Link href='https://www.freepik.com' color='inherit' underline='always'>
                    Freepik
                    </Link>{' '}
                    from{' '}
                    <Link href='https://www.flaticon.com' color='inherit' underline='always'>
                    www.flaticon
                    </Link>
                </Typography> */}
            </Grid>
        </Grid>
        
    </div>
  )
}

export default Footer