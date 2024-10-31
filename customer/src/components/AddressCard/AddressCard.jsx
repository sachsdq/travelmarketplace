import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div>
      <div className='space-y-3'>
        <p className='font-semibold'>
          {/* An Nguyen */}
          {address?.firstName +" "+ address?.lastName}
        </p>
        <p>
          {address?.streetAddress +", "+ address?.state +", "+ address?.city}
          {/* 132 Le Duan, TP.HCM */}
        </p>
        <div className='space-y-1'>
          <p className='font-semibold'>Số điện thoại</p>
          <p>
            {address?.mobile}
            {/* 0214292847 */}
            </p>
        </div>
      </div>
    </div>
  )
}

export default AddressCard