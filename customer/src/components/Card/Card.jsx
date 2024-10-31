import React, { useEffect, useState } from 'react'
import tphcm from '../img/tphcm.jpg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import { getAllProduct } from '../../State/Product/Action'
import "../Product/ProductCard.css"
// import hanoi from '../img/hanoi.jpg'

const Card = ({product}) => {
  // const [product,setProduct] = useState([])
  const navigate=useNavigate()
  const dispatch = useDispatch()
  // const {products} = useSelector(store=>store)

  // useEffect(()=>{
  //   const data = {
  //     // category: categoryValue || []
  //   }
  //   dispatch(getAllProduct(data))
  // },[])

  return (
    <div onClick={()=>navigate(`/product/${product?._id}`)} className='cursor-pointer flex flex-col items-center bg-white
    overflow-hidden w-[15rem] h-full mx-3 flex-wrap justify-center'>
        <div className='h-[13rem] w-full'>
            <img className='object-cover object-top w-full h-full rounded-lg' src={product.imageUrl} alt=''/>
        </div>
        <div className='p-4 justify-start'>
            <h3 className='text-sm font-medium text-gray-900'>
              {/* Thương hiệu sản phẩm */}
              {product.title}
            </h3>
            <p className='mt-2 text-sm text-grey-500 opacity-50 line-through'>
              {/* Tên sản phẩm */}
              <FormattedNumber
                value={product.price}
                style="currency"
                currency="VND"
                minimumFractionDigits={0}
              />
              
            </p>
            <p className='mt-2 text-sm text-grey-700 font-semibold'>
              {/* Tên sản phẩm */}
              <FormattedNumber
                value={product.discountedPrice}
                style="currency"
                currency="VND"
                minimumFractionDigits={0}
              />
            </p>
        </div>
    </div>
  )
}

export default Card