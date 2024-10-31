import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Saler from '../Saler/Saler'

const SalerRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={<Saler/>}></Route>
        </Routes>
    </div>
  )
}

export default SalerRouter