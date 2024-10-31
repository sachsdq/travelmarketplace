import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import Card from '../Card/Card'
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../State/Product/Action';
import { store } from '../../State/store';

const CardCarousel = ({category}) => {
    const [activeIndex,setActiveIndex]=useState(0)
    const [filterProduct, setFilterProduct] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {products} = useSelector(store=>store)

    // console.log("filter Product ",filterProduct)
    // console.log("Product ",products)
    const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4.5 },
    };

    
    useEffect(() => {
        const newFilterProduct = products.products?.filter((items) => {
            return items.category?.name.toLowerCase().includes(category.toLocaleLowerCase())
        });
        setFilterProduct(newFilterProduct);
      }, [products.products,category]);
    
      useEffect(()=>{
          const data = {
              category: category==="khachsan"?category==="khachsan"
              :category==="thuexe"?category==="thuexe"
              :category==="thietbi"?category==="thietbi":category==="tour"
            }
            dispatch(getAllProduct(data))
        },[dispatch,category])
        
        const items = (filterProduct || [])?.slice(0,10)?.map((item)=> <Card product={item}/>)
        
        const slidePrev = () => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
          };
          
        const slideNext = () => {
            if (activeIndex < items.length - 1) {
              setActiveIndex(activeIndex + 1);
            }
          };

        const syncActiveIndex=({item})=>setActiveIndex(item)

  return (
    <div className='h-full'>
        <h2 className='text-2xl font-bold text-grey-800 px-7'>
            {category==="khachsan"?"Khách sạn":category==="tour"?"Tour du lịch":category==="thuexe"?"Xe cho thuê":"Trang thiết bị"}
        </h2>
        {/* <h2 className='text-2xl font-extrabold text-grey-800 py-5'>{sectionName}</h2> */}
        <div  className='relative p-2 h-full'>
            <AliceCarousel
                items={items}
                disableButtonsControl
                responsive={responsive}
                disableDotsControls
                // onSlideChanged={syncActiveIndex}
                onSlideChanged={({ item }) => syncActiveIndex({ item })}
                activeIndex={activeIndex}
                renderNextButton={({isDisabled})=>(activeIndex !== items.length - 4 &&<Button variant='contained' className='z-50' 
                    onClick={slideNext} sx={{position:'absolute', top:'8rem', 
                        right:'0rem', transform:'translateX(50%) rotate(90deg)', bgcolor:'white'}} 
                        aria-label='next'>
                            <KeyboardArrowLeftIcon sx={{transform:'rotate(90deg)', color:'black'}}/>
                        </Button>)}

                renderPrevButton={({isDisabled})=>(activeIndex !== 0 && <Button variant='contained' className='z-50' 
                    onClick={slidePrev} sx={{position:'absolute', top:'8rem', 
                        left:'0rem', transform:'translateX(-50%) rotate(90deg)', bgcolor:'white'}} 
                        aria-label='next'>
                            <KeyboardArrowLeftIcon sx={{transform:'rotate(-90deg)', color:'black'}}/>
                        </Button>)}
            />
            <button onClick={()=>navigate(`/product/${category==="khachsan"?"hotel"
                :category==="thuexe"?"rent"
                :category==="thietbi"?"device"
                :"tour"}`)} 
              className='font-semibold text-blue-500 bg-stone-100 px-5 py-2 rounded hover:bg-stone-200 m-auto'>
                Xem tất cả <KeyboardArrowLeftIcon sx={{transform:'rotate(180deg)'}}/>
            </button>
        </div>
    </div>
  )
}

export default CardCarousel