import React, { useEffect } from 'react'
import { FormattedNumber } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../State/Cart/Action';

const PaymentSumary = ({ selectedItems }) => {
    const dispatch = useDispatch()
    const {cart} = useSelector(store=>store)
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalQuantity = 0

    console.log("cart: ",cart)
    console.log("selectedItems: ",selectedItems)

    const cartItems = cart?.cartItems.filter((item) => {
        return selectedItems.includes(item._id.toString());
      });
      
      cartItems.forEach((item) => {
        const itemPrice = typeof item.price === 'number' ? item.price : 0;
        const itemDiscountedPrice = typeof item.discountedPrice === 'number' ? item.discountedPrice : 0;
        const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
      
        totalPrice += itemPrice;
        totalDiscount += itemPrice - itemDiscountedPrice;
        totalQuantity += itemQuantity;
      });

// const cartItems = cart?.cartItems.map((item) => {
//   const isSelected = selectedItems.includes(item._id.toString());
//   let itemPrice = item.price;
//   let itemDiscount = item.price - item.discountedPrice;
//   let itemQuantity = item.quantity;

//   if (isSelected) {
//     totalPrice += itemPrice;
//     totalDiscount += itemDiscount;
//     totalQuantity += itemQuantity;
//   }

//   return { ...item, isSelected, itemPrice, itemDiscount, itemQuantity };
//   if (isSelected) {
//     totalPrice += item.price;
//     totalDiscount += item.price - item.discountedPrice;
//     totalQuantity += item.quantity;
//   }
//   return { ...item, isSelected };
// });

    // const cartItems = cart?.cartItems.map((item)=>{
    //     if(selectedItems.includes(item._id.toString())){
    //         totalPrice += item.price;
    //         totalDiscount += item.price - item.discountedPrice;
    //         totalQuantity += item.quantity
    //         return true
    //     }
    //     return false
    // })
    console.log("cartItems: ",cartItems)

    useEffect(()=>{
        dispatch(getCart())
      },[])

  return (
    <div className='border'>
        <p className='uppercase font-bold opacity-60 pb-4'>Sản phẩm thanh toán ({totalQuantity})</p>
        <hr/>
        {/* {cart.cart?.cartItems.map((item)=>( */}
        <div className="space-y-3 font-semibold mb-10">
        <div className="flex justify-between pt-3 text-black">
            <span>Tổng tiền chưa giảm</span>
            <span>
            <FormattedNumber
                value={totalPrice}
                style="currency"
                currency="VND"
                minimumFractionDigits={0}
            />
            </span>
        </div>
        <div className="flex justify-between pt-3 ">
            <span>Giảm giá</span>
            <span className="text-green-600">
            <FormattedNumber
                value={totalDiscount}
                style="currency"
                currency="VND"
                minimumFractionDigits={0}
            />
            </span>
        </div>
        <div className="flex justify-between pt-3">
            <span>Phí vận chuyển</span>
            <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between pt-3 font-bold">
            <span>Tổng tiền đã giảm</span>
            <span className="text-green-600">
            <FormattedNumber
                value={totalPrice - totalDiscount}
                style="currency"
                currency="VND"
                minimumFractionDigits={0}
            />
            </span>
        </div>
        </div>
            {/* ))} */}
    </div>
  )
}

export default PaymentSumary