import React from 'react'
import tphcm from '../img/tphcm.jpg'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, IconButton, Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import { removeCartItem, updateCartItem } from '../../State/Cart/Action';

const CartItem = ({item}) => {
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const handleUpdateCartItem=(num)=>{
        const data={data:{quantity:item.quantity+num},cartItemId:item?._id}
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem=()=>{
        dispatch(removeCartItem(item._id))
    }

    const handleNavigate = ()=>{
        navigate(`/product/${item.product._id}`)
    }

  return (
    <div className='p-5 shadow-lg border rounded-md cursor-pointer'>
        {/* <input type="checkbox" className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'/> */}
        <div onClick={handleNavigate} className='flex items-center'>
            <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                <img className='w-full h-full object-cover object-top'
                // src={tphcm}
                src={item.product?.imageUrl}
                alt=''/>
            </div>

            <div className='ml-5 space-y-1'>
                <p className='font-semibold'>
                    {/* Tên sản phẩm */}
                    {item.product?.title}
                </p>
                <p className='opacity-70'>
                    {/* Size :  */}
                    {/* Size: {item.size} */}
                    {/* Đánh giá */}
                    Đánh giá: <Rating sx={{ fontSize: 'inherit' }} value={4} name='half-rating' readOnly precision={.5}/>
                </p>
                <p className='opacity-70 mt-2'>
                    {/* Seller: Travel company */}
                    Thương hiệu: {item.product?.brand}
                </p>
                <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                    <p className='font-semibold'>
                        {/* 1000 vnđ */}
                        {/* {item.discountedPrice} vnđ */}
                        <FormattedNumber
                        value={item.discountedPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                    </p>
                    <p className='opacity-50 line-through'>
                        {/* 100 vnđ */}
                        {/* {item.price} vnđ */}
                        <FormattedNumber
                        value={item.price}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
                    </p>
                    <p className='text-green-600 font-semibold'>
                        {/* 5% off */}
                        {item.product?.discountPercent}%
                    </p>
                </div>
            </div>

            
        </div>
        <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={item.quantity<=1}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>
                    <IconButton onClick={()=>handleUpdateCartItem(1)} sx={{color:"RGB(145 85 253"}}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    
                </div>

                {/* <div>
                    <Button onClick={()=>navigate(`/product/${item.product.map((product)=>product?._id)}`)} variant="outlined" color="secondary">chi tiết</Button>
                </div> */}

                <div>
                    <Button onClick={handleRemoveCartItem} variant="outlined" sx={{color:"RGB(145 85 253"}}>xóa</Button>
                </div>
            </div>
    </div>
  )
}

export default CartItem