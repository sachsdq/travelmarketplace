import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Đăng nhập', 'Địa chỉ giao hàng', 'Tóm tắt đơn hàng', 'Thanh toán'];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation()
  const querySearch = new URLSearchParams(location.search)

  const idParam = querySearch.get('id');
  const id = idParam ? idParam.split('?')[0] : null;
  let step = querySearch.get('step')
  if (!querySearch.has('step')) {
    step = 2; // Gán giá trị mặc định cho step nếu không tìm thấy
  }
  // const id = querySearch.get('id')

  console.log('step: ',step)
  console.log('id: ',id)

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <div className='px-10 lg:px-20 py-10 lg:py-5'>
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={step}>
            {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
        </Stepper>
        {activeStep === steps.length ? (
            <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            </React.Fragment>
        ) : (
            <React.Fragment>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                Back
                </Button>
            </Box> */}

            <div className='mt-10'>
                {id && "id?step==2"?<DeliveryAddressForm/>:<OrderSummary/>}
            </div>
            </React.Fragment>
        )}
        </Box>
    </div>
  );
}
