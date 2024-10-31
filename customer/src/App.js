import { Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation/Navigation';
import Product from './components/Product/Product';
import ProductDetails from './components/ProductDetails/ProductDetails';
import HomePage from './pages/HomePage/HomePage'; 
import CustomerRouters from './Routers/CustomerRouter';
import SalerRouter from './Routers/SalerRouter';
import AdminRouter from './Routers/AdminRouter';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/*' element={<CustomerRouters/>}></Route>
        <Route path='/saler/*' element={<SalerRouter/>}></Route>
        <Route path='/admin/*' element={<AdminRouter/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
