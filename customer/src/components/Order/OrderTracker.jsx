import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

// const steps = [
//     "Placed",
//     "Order Confirmed",
//     "Shipped",
//     "Out for Delivery",
//     "Delivered",
// ]

const steps = [
    "Đặt hàng thành công",
    "Đã đóng gói đơn hàng và giao đến trung tâm trung chuyển",
    "Đã rời khỏi trung tâm trung chuyển",
    "Đang giao hàng",
    "Giao hàng thành công",
]

const OrderTracker = ({activeStep}) => {
  return (
    <div className='w-full'>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label)=> <Step>
                <StepLabel sx={{color:"#9155FD",fontSize:"44px"}}>{label}</StepLabel>
            </Step>)}
        </Stepper>
    </div>
  )
}

export default OrderTracker