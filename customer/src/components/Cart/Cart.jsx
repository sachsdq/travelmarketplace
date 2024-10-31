import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { getCart } from '../../State/Cart/Action'
import { store } from '../../State/store'
import PaymentSumary from './PaymentSumary'

const Cart = () => {
  const [cartItemId,setCartItemId] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart} = useSelector(store=>store)

  const handleCheckout=()=>{
    // navigate("/checkout?step=2")
    navigate(`/checkout?id=${cartItemId}?step=2`)
  }

  const handleChecked = (item) => {
    // Kiểm tra xem item đã có trong mảng cartItemId chưa
    if (cartItemId.includes(item)) {
      // Nếu có, thì xóa item ra khỏi mảng
      setCartItemId(cartItemId.filter((id) => id !== item));
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      // Nếu chưa có, thì thêm item vào mảng
      setCartItemId([...cartItemId, item]);
      setSelectedItems([...selectedItems, item]);
    }
  };
  console.log("set cartItemId : ",cartItemId)
  console.log("selected Items : ",selectedItems)

  useEffect(()=>{
    dispatch(getCart())
  },[cart.updateCartItem,cart.deleteCartItem])
  return (
    <div>
      <div className='lg:grid grid-cols-3 lg:px-10 relative py-5'>
        <div className='col-span-2'>
            {cart.cart?.cartItems.map((item)=> 
            <table className='w-full'>
              <tr>
                <td>
                  <input onChange={()=>handleChecked(item._id)}
                  type="checkbox" 
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'/>
                </td>
                <td>
                  <div className=''>
                    {/* {[1,1,1,1,1,1,1].map((item)=> <CartItem/>)} */}
                    {/* {cart.cart?.cartItems.map((item)=> )} */}
                    <CartItem item={item?item:null}/>
                  </div>
                </td>
              </tr>
            </table>
          )}
        </div>
      

        <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
            <PaymentSumary selectedItems={selectedItems}/>
            <Button onClick={handleCheckout} variant='contained' className="w-full mt-5" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd'}}>
                Thanh toán
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Cart