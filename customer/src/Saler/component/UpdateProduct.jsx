import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { findProductsById, updateProduct } from '../../State/Product/Action'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { api } from '../../config/apiConfig'
import { Category } from '@mui/icons-material'

const UpdateProduct = () => {
    const [updateData,setUpdateData] = useState({
        _id:"",
        imageUrl:"",
        brand:"",
        title:"",
        discountedPrice:"",
        price:"",
        discountPercent:"",
        quantity:"",
        category:"",
        description:"",
    })
    const [productData,setProductData] = useState({
        imageUrl:"",
        brand:"",
        title:"",
        discountedPrice:"",
        price:"",
        discountPercent:"",
        quantity:"",
        productCategory:"",
        description:"",
        // color:"",
        // size:initialSizes,
        // topLavelCategory:"",
        // secondLavelCategory:"",
        // thirdLavelCategory:"",
      })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    const handleChange = (e) => {
        const {name, value} = e.target
        // Kiểm tra xem value có phải số âm hay không
        if (name === 'quantity' && value < 0) {
        // Nếu là số âm, không cho phép cập nhật state
          return;
        }
        if (name === 'discountPercent' && value < 0) {
          return;
        }
        if (name === 'price' && value < 0) {
          return;
        }
        setUpdateData((prevState)=>({
          ...prevState,
          [name]:value
        }))
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        const data={data:updateData,productId:updateData?._id}
        dispatch(updateProduct(data));

        console.log("updateData submit .....",updateData)
        console.log("updateData id submit .....",updateData._id)
    
        navigate('/saler/products');
      }

      useEffect(() => {
        const getProductForUpdate = async()=>{
          try {
              // const response = dispatch(findProductsById(id))
              const response = await api.get(`/api/products/id/${id}`)
              setUpdateData(response.data)
  
              console.log("product response",response)
              console.log("product editing ....",updateData)
              
          } catch (error) {
              console.log("loi lay du lieu",error)
          }
        }
            getProductForUpdate()
      }, [dispatch, id]);

  return (
    <div className='createProductContainer p-10'>
      <Typography 
      variant='h3'
      sx={{textAlign:"center"}}
      className='py-10 text-center'
      >
      Chỉnh sửa sản phẩm
    </Typography>
    {/* {updateData?.map((item)=> ( */}
    <form onSubmit={handleSubmit} 
      className='createProductContainer min-h-screen'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Đường dẫn hình ảnh"
            name='imageUrl'
            value={updateData.imageUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Thương hiệu"
            name="brand"
            value={updateData.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            name="title"
            value={updateData.title}
            onChange={handleChange}
          />
        </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Danh mục"
            name="category"
            value={updateData.category.name}
            // onChange={handleChange}
          />
          </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            name="productCategory"
            value={productData.productCategory}
            onChange={handleChange}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số lượng"
            name="quantity"
            value={updateData.quantity}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Giá gốc"
            name="price"
            value={updateData.price}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Phần trăm giảm giá"
            name="discountPercent"
            // value={updateData.discountPercent = Math.round(((updateData.price - updateData.discountedPrice) / updateData.price) * 100)}
            value={updateData.discountPercent}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Giá đã giảm"
            name="discountedPrice"
            // value={updateData.discountedPrice = Math.round(updateData.price-(updateData.price*updateData.discountPercent))}
            value={updateData.discountedPrice = Math.max(0, updateData.price * (1 - (updateData.discountPercent / 100)))}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        {/* <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Top Level Category</InputLabel>
            <Select
              name='topLavelCategory'
              value={productData.topLavelCategory}
              onChange={handleChange}
              label="Top Level Category"
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </FormControl>
      </Grid>
      <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Second Level Category</InputLabel>
            <Select
              name='secondLavelCategory'
              value={productData.secondLavelCategory}
              onChange={handleChange}
              label="Second Level Category"
            >
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
              <MenuItem value="brands">Brands</MenuItem>
            </Select>
          </FormControl>
      </Grid>
      <Grid item xs={6} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Third Level Category</InputLabel>
            <Select
              name='thirdLavelCategory'
              value={productData.thirdLavelCategory}
              onChange={handleChange}
              label="Third Level Category"
            >
              <MenuItem value="top">Tops</MenuItem>
              <MenuItem value="women_dress">Dresses</MenuItem>
              <MenuItem value="t-shirts">T-Shirts</MenuItem>
              <MenuItem value="saree">Saree</MenuItem>
              <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
              <MenuItem value="men_tshirt">Men T-Shirt</MenuItem>
            </Select>
          </FormControl>
      </Grid> */}
      <Grid item xs={12}>
          <TextField
            fullWidth
            id='outlined-multiline-static'
            label="Miêu tả"
            multiline
            name="description"
            rows={3}
            value={updateData.description}
            onChange={handleChange}
          />
        </Grid>

        {/* {productData.size.map((size,index)=>(
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Size Name"
                name="name"
                value={size.name}
                onChange={(event)=>handleSizeChange(event,index)}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                name="size_quantity"
                type="number"
                onChange={(event)=>handleSizeChange(event,index)}
                required
                fullWidth
              />
            </Grid>
          </Grid>
        ))} */}
        <Grid item xs={12}>
          <Button
            variant='contained'
            sx={{p:1.8}}
            className='py-20'
            size="large"
            type="submit"
          >
            Lưu thay đổi
          </Button>
        </Grid>
      </Grid>
    </form>
    {/* ))} */}
    </div>
  )
}

export default UpdateProduct