import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedNumber } from 'react-intl';
import { store } from '../../State/store'
import { deleteProduct, getAllProduct, getAllProductsSaler } from '../../State/Product/Action'
import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const ProductTableView = () => {
  const [product, setProduct] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const dispatch = useDispatch()
  const {products} = useSelector(store=>store)

//   console.log("product .....",products)

  useEffect(()=>{
    const data = {}
    dispatch(getAllProductsSaler(data))
  },[])

  useEffect(() => {
    // lay tat ca san pham vao state product de sap xep
    const data = products.products.filter((item)=> {
      return item
    })
    setProduct(data);
  }, [products.products]);

  useEffect(() => {
    // sap xep san pham bang ham sort theo ngay tao tu moi nhat den cu nhat
    const sortedProducts = [...product].sort((a, b) => {
      const dateA = new Date(a.createAt);
      const dateB = new Date(b.createAt);
      return dateB.getTime() - dateA.getTime();
    });

    // lay toi da 5 san pham
    setLatestProducts(sortedProducts.slice(0, 5));
  }, [product]);

  return (
    <div className='p-5'>

      <Card className='mt-2 bg-[#1b1b1b]'>
        <CardHeader title="Sản phẩm gần đây"/>
      </Card>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell align="left">Tên</TableCell>
            <TableCell align="left">Giá gốc</TableCell>
            <TableCell align="left">Giá bán</TableCell>
            <TableCell align="left">Giảm giá</TableCell>
            <TableCell align="left">Số lượng</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {/* {products.products?.slice(0,5).map((item) => ( */}
          {latestProducts?.map((item) => (
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
              <TableCell align="left">
                <FormattedNumber
                    value={item.price}
                    style="currency"
                    currency="VND"
                    minimumFractionDigits={0}
                  />
              </TableCell>
              <TableCell align="left">
                <FormattedNumber
                    value={item.discountedPrice}
                    style="currency"
                    currency="VND"
                    minimumFractionDigits={0}
                  />
              </TableCell>
              <TableCell align="left">{item.discountPercent}%</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default ProductTableView