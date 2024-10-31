import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverView from './MonthlyOverView'
import ProductTableView from '../view/ProductTableView'

const Dashboard = () => {
  return (
    <div className='p-10'>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Achivement/>
            </Grid>

            <Grid item xs={12} md={8}>
              <MonthlyOverView/>
            </Grid>

            <Grid item={12}>
              <div className='shadow-lg shadow-gray-600'>
                <ProductTableView/>
              </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Dashboard