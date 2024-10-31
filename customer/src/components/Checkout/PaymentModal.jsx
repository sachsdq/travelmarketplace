import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPayment } from '../../State/Payment/Action';
import { placedOrders, updateOrderStatus } from '../../State/Order/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

// const [open, setOpen] = React.useState(false);
// const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);

const PaymentModal = ({handleClose,open}) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get("order_id")

  const handleCheckOutByCast = ()=>{
    const data = {
      orderId: orderId, 
      // newStatus:"PLACED"
    }
    // dispatch(updateOrderStatus(data))
    dispatch(placedOrders(data))
    navigate(`/payment/${orderId}`)
  }
  
  const handleCheckOutByVNpay = () =>{
    dispatch(createPayment(orderId))
  }

  // async function handlePayment() {
  //   try {
  //     const id = orderId; // Lấy orderId từ đâu đó
  //     const newStatus = 'PLACED'; // Trạng thái mới sau khi thanh toán
  
  //     const updatedOrder = await updateOrderStatus(id, newStatus);
  //     console.log('Đơn hàng đã được cập nhật:', updatedOrder);
      
  //     navigate(`/payment/${id}`)
  //     // Hiển thị thông báo hoặc thực hiện các hành động khác
  //     alert('Thanh toán thành công!');
  //   } catch (error) {
  //     console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
  //     alert(`Có lỗi xảy ra: ${error.message}`);
  //   }
  // }

//   const paymentButton = document.getElementById('paymentButton');
// paymentButton.addEventListener('click', handlePayment);
  
  // useEffect(()=>{
  //   const data = {
  //     orderStatus:"PLACED"
  //   }
  //   dispatch(updateOrderStatus(data))
  // },[])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {/* {location.pathname==="/login" ? <LoginForm/> : <RegisterForm/>} */}
            <div className='space-y-5'>
                <h1 className='font-bold'>Chọn phương thức thanh toán</h1>
                <Button onClick={handleCheckOutByCast} id="paymentButton" variant='contained' className="w-full mt-5" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd'}}>Thanh toán khi nhận hàng</Button>
                <Button onClick={handleCheckOutByVNpay} variant='contained' className="w-full mt-5" sx={{px:'2.5rem', py:'.7rem', bgcolor:'#9155fd'}}>Thanh toán bằng VnPay</Button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default PaymentModal