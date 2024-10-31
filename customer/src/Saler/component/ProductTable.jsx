import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_BASE_URL, api } from "../../config/apiConfig"
import { store } from '../../State/store'
import { deleteProduct, getAllProduct, getAllProductsSaler, updateProduct } from '../../State/Product/Action'
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormattedNumber } from 'react-intl'
import CreateProductForm from './CreateProductForm'

const ProductTable = () => {
  const [currentCategory,setCurrentCategory] = useState("all")
  const [isOpen,setIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {products} = useSelector(store=>store)

  // console.log("product .....",products)

  const handleProductUpdate = (product)=>{
    console.log('editing product ...',product)
    navigate(`/saler/updateproduct/${product._id}`);
  }

  const handleProductDelete = (productId) =>{
    dispatch(deleteProduct(productId))
    setIsOpen(false)
  }

  
  useEffect(()=>{
    const data = {
      // category: currentCategory === 'all' ? '' : currentCategory
      }
      dispatch(getAllProductsSaler(data))
      },[products.deletedProduct, products.updatedProduct,currentCategory])

      // useEffect(() => {
      //   const data = {
      //     category: 'khachsan'
      //   };
      //   dispatch(getAllProduct(data));
      // }, [currentCategory]);
      
      const handleCurrentCategory = (category) =>{
        setCurrentCategory(category)
        const data = {
          category: category === 'all' ? '' : category,
        };
        dispatch(getAllProduct(data));
        console.log(category)
      }

      const filteredProducts = currentCategory === "all"
    ? products.products
    : products.products.filter((product) => product.category.name === currentCategory);

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Tất cả sản phẩm"/>
        <div className='p-5'>
          <h2>Lọc: </h2>
          <div className='flex gap-2 pt-2'>
            <button onClick={()=>handleCurrentCategory("all")} className='border rounded p-1 hover:border-sky-700 active:border-sky-700 focus:outline-none focus:ring focus:ring-sky-700'>Tất cả</button>
            <button onClick={()=>handleCurrentCategory("khachsan")} className='border rounded p-1 hover:border-sky-700 active:border-sky-700 focus:outline-none focus:ring focus:ring-sky-700'>Khách sạn</button>
            <button onClick={()=>handleCurrentCategory("thuexe")} className='border rounded p-1 hover:border-sky-700 active:border-sky-700 focus:outline-none focus:ring focus:ring-sky-700'>Thuê xe</button>
            <button onClick={()=>handleCurrentCategory("thietbi")} className='border rounded p-1 hover:border-sky-700 active:border-sky-700 focus:outline-none focus:ring focus:ring-sky-700'>Thiết bị</button>
            <button onClick={()=>handleCurrentCategory("tour")} className='border rounded p-1 hover:border-sky-700 active:border-sky-700 focus:outline-none focus:ring focus:ring-sky-700'>Tour</button>
          </div>
        </div>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell align="left">Tên</TableCell>
            {/* <TableCell align="left">Danh mục</TableCell> */}
            <TableCell align="left">Giá gốc</TableCell>
            <TableCell align="left">Giá bán</TableCell>
            <TableCell align="left">Giảm giá</TableCell>
            <TableCell align="left">Số lượng</TableCell>

            <TableCell align="left">Sửa</TableCell>
            <TableCell align="left">Xóa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell align='left' scope="row">
                {item.title}
              </TableCell>
              {/* <TableCell align="left">{item.category.name}</TableCell> */}
              <TableCell align="left">
                <FormattedNumber
                        value={item.price}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                /></TableCell>
                <TableCell align="left">
                <FormattedNumber
                        value={item.discountedPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                /></TableCell>
                <TableCell align="left">{item.discountPercent}%</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>

              <TableCell align="left">
                <Button onClick={()=>handleProductUpdate(item)} variant='outlined'>Sửa</Button>
              </TableCell>
              <TableCell align="left">
                <Button onClick={()=>setIsOpen(true)} variant='outlined'>Xóa</Button>
              {isOpen===true? 
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-100">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className='text-lg font-medium mb-4'>Xác nhận xóa sản phẩm</h3>
                        <p className='mb-6'>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                        <div className="flex justify-end">
                            <button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2' 
                            onClick={()=>setIsOpen(false)}>
                                Hủy
                            </button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-md' 
                            onClick={()=>handleProductDelete(item._id)}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
                : null
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ProductTable