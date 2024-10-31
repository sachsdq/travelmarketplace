import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct, findProductsById, updateProduct } from '../../State/Product/Action'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FormattedNumber } from 'react-intl'

// const initialSizes = [
//   { name: "S", quantity: 0},
//   { name: "M", quantity: 0},
//   { name: "L", quantity: 0},
// ]

const initialCategory = [
  { id: "khachsan", name: "khachsan"},
  { id: "thuexe", name: "thuexe"},
  { id: "thietbi", name: "thietbi"},
  { id: "tour", name: "tour"},
]

const CreateProductForm = () => {
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
  const jwt = localStorage.getItem("jwt")

  const handleChange = (e) => {
    const {name, value} = e.target
    // Kiểm tra xem value có phải số âm hay không
    if (name === 'quantity' && value < 0) {
      // Nếu là số âm, không cho phép cập nhật state
      return;
    }
    if (name === 'price' && value < 0) {
      // Nếu là số âm, không cho phép cập nhật state
      return;
    }
    if (name === 'discountPercent' && value < 0) {
      // Nếu là số âm, không cho phép cập nhật state
      return;
    }
    if (name === 'discountedPrice' && value < 0) {
      // Nếu là số âm, không cho phép cập nhật state
      return;
    }
    setProductData((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  // const handleSizeChange = (e, index)=>{
  //   let {name, value} = e.target
  //   name === "size_quantity"?name="quantity":name=e.target.name

  //   const sizes = [...productData.size]
  //   sizes[index][name] = value
  //   setProductData((prevState)=>({
  //     ...prevState,
  //     size: sizes
  //   }))
  // }

  // const handleCategoryChange = (e, index)=>{
  //     let {name,value} = e.target
  //     ?name==="productCategory":name=e.target.name
  
  //     const categories = [...productData.productCategory]
  //     categories[index][name] = value
  //     setProductData((prevState)=>({
  //       ...prevState,
  //       productCategory: categories
  //     }))
  //   }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createProduct(productData));

    console.log("productData submit .....",productData)

    navigate('/saler/products');
  }

  const FormattedPrice = ({ price }) => {
    const formattedPrice = price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return <span>{formattedPrice}</span>;
  };

  return (
    <div className='createProductContainer p-10'>
      <Typography 
      variant='h3'
      sx={{textAlign:"center"}}
      className='py-10 text-center'
    >
      Thêm sản phẩm mới
    </Typography>
    <form onSubmit={handleSubmit} 
      className='createProductContainer min-h-screen'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Đường dẫn hình ảnh"
            name='imageUrl'
            value={productData.imageUrl}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Thương hiệu"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tên sản phẩm"
            name="title"
            value={productData.title}
            onChange={handleChange}
          />
        </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Danh mục"
                name="productCategory"
                value={productData.productCategory}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="khachsan">Khách sạn</MenuItem>
                <MenuItem value="thuexe">Thuê xe</MenuItem>
                <MenuItem value="thietbi">Thiết bị</MenuItem>
                <MenuItem value="tour">Tour</MenuItem>
              </Select>
            </FormControl>
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
            value={productData.quantity}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Giá gốc"
            name="price"
            value={productData.price}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Phần trăm giảm giá"
            name="discountPercent"
            // value={productData.discountPercent = Math.round(((productData.price - productData.discountedPrice) / productData.price) * 100)}
            value={productData.discountPercent}
            onChange={handleChange}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Giá đã giảm"
            name="discountedPrice"
            value={productData.discountedPrice = Math.max(0, productData.price * (1 - (productData.discountPercent / 100)))}
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
            value={productData.description}
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
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  )
}

export default CreateProductForm