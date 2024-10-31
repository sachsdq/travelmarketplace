import React from 'react'
import './ProductCard.css'
import tphcm from '../img/tphcm.jpg'
import { useNavigate } from 'react-router-dom'
import { FormattedNumber } from 'react-intl'

const ProductCard = ({product}) => {
    // const {title,brand,imageUrl,price,discountedPrice,color,discountedPercent}=item
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate(`/product/${product?._id}`)
        // navigate(`/product/${5}`)
    }
  return (
    <div onClick={handleNavigate} className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
        <div className='h-[20rem]'>
            <img className='h-full w-full object-cover object-left-top' 
            // src={tphcm}
            src={product.imageUrl}
            alt=''/>
        </div>
        <div className='textPart bg-white p-3'>
            <div>
                <p className='font-bold opacity-60'>
                    {/* tên sp */}
                    {product.brand}
                </p>
                <p>
                    {/* miêu tả ngắn sản phẩm */}
                    {product.title}
                </p>
            </div>
            <div className='flex items-center space-x-2'>
                <p className='font-semibold'>
                    {/* 100 vnd */}
                    {/* {product.discountedPrice} vnđ */}

                    <FormattedNumber
                        value={product.discountedPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                </p>
                <p className='line-through opacity-50'>
                    {/* 1000 vnd */}
                    {/* {product.price} vnđ */}

                    <FormattedNumber
                        value={product.price}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                </p>
                <p className='text-green-600 font-semibold'>
                    {/* 70% off */}
                    {product.discountPercent} %
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard