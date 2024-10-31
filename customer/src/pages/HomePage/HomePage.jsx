import React from 'react'
import SlideAliceCarousel from '../../components/AliceCarousel/SlideAliceCarousel'
import CardCarousel from '../../components/CardCarousel/CardCarousel'
import SearchIcon from '@mui/icons-material/Search';
// import {sectionName} from '../../sanpham/sectionName'

const HomePage = () => {
  return (
    <div className=''>
        <SlideAliceCarousel/>
        <div className='space-y-10 py-10 flex flex-col justify-center px-5 lg:px-10'>
          <div className=''>
            {/* <h2 className='text-2xl font-extrabold text-grey-800 py-5'>Khách sạn</h2> */}
            <CardCarousel category="khachsan"/>
          </div>
          <div>
            {/* <h2 className='text-2xl font-extrabold text-grey-800 py-5'>Xe cho thuê</h2> */}
            <CardCarousel category="thuexe"/>
          </div>
          <div>
            {/* <h2 className='text-2xl font-extrabold text-grey-800 py-5'>Trang thiết bị du lịch</h2> */}
            <CardCarousel category="thietbi"/>
          </div>
          <div>
            {/* <h2 className='text-2xl font-extrabold text-grey-800 py-5'>Tour du lịch</h2> */}
            <CardCarousel category="tour"/>
          </div>
        </div>
    </div>
  )
}

export default HomePage