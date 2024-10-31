import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import slide2 from '../img/pic1.png'
import banner from '../img/banner.png'

// const responsive = {
//     0: { items: 1 },
//     568: { items: 2 },
//     1024: { items: 3 },
// };

const items = [
    <div className="item" data-value="1">
        <img className='w-full h-full cursor-pointer' role='presentation' src={banner} alt="" />
    </div>,
    <div className="item" data-value="2">
        <img className='w-full h-full cursor-pointer' role='presentation' src={banner} alt="" />
    </div>,
    <div className="item" data-value="3">
        <img className='w-full h-full cursor-pointer' role='presentation' src={banner} alt="" />
    </div>,
    <div className="item" data-value="4">
        <img className='w-full h-full cursor-pointer' role='presentation' src={banner} alt="" />
    </div>,
    <div className="item" data-value="5">
        <img className='w-full h-full cursor-pointer' role='presentation' src={banner} alt="" />
    </div>,
];

const SlideAliceCarousel = () => {
    return(
        <AliceCarousel
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite
        />
    )
};

export default SlideAliceCarousel