import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material';
import ProductReviewCard from './ProductReviewCard';
import Card from '../Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedNumber } from 'react-intl';
import { findProductsById, getAllProduct } from '../../State/Product/Action';
import { store } from '../../State/store';
import { addItemToCart } from '../../State/Cart/Action';
import ProductCard from '../Product/ProductCard';

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  // const [selectedSize, setSelectedSize] = useState("")
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const navigate=useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const {products}=useSelector(store=>store)

  const handleAddToCart=()=>{
    const data={
      productId:params.productId,
      // size:selectedSize.name
    }
    console.log("data ....",data)
    dispatch(addItemToCart(data))
    navigate('/cart')
  }

  useEffect(()=>{
    const data={productId:params.productId}
    dispatch(findProductsById(data))
  },[params.productId])

  useEffect(()=>{
    const data = {
      // category: categoryValue || []
    }
    dispatch(getAllProduct(data))
  },[])

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        {/* <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */}

<section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
        {/* Image gallery */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
            <img
              src={products.product?.imageUrl}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* <div className="flex flex-wrap space-x-5 justify-center">
            {product.images.map((item)=> <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>)}
          </div> */}
        </div>

        {/* Product info */}
        <div className="lg:cols-span-1 max-auto max-w-2xl px-4 pb-6 sm:px-6 lg:max-w-7xl lg:px-8
        lg:pb-24">
          <div className="lg:col-span-2">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              {/* tên sản phẩm */}
              {products.product?.title}
            </h1>
            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>
              {/* thương hiệu sản phẩm */}
              {products.product?.brand}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
              <p className='font-semibold'>
                <FormattedNumber
                        value={products.product?.discountedPrice}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
              </p>
              <p className='opacity-50 line-through'>
                <FormattedNumber
                        value={products.product?.price}
                        style="currency"
                        currency="VND"
                        minimumFractionDigits={0}
                    />
              </p>
              <p className='text-green-600 font-semibold'>
                {products.product?.discountPercent} %
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <div className='flex items-center space-x-3'>
                <Rating name="read-only" value={4} readOnly />
                <p className='opacity-50 text-sm'>100 Đánh giá</p>
                <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>20 Bình luận</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              {/* <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Sizes */}
              {/* <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}
              
              {/* Nút lưu sản phẩm */}
              <Button onClick={handleAddToCart} variant='contained' sx={{px:'2rem', py:'1rem', bgcolor:'#9155fd'}}>
                Thêm vào giỏ hàng
              </Button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-2">
                  <h2 className="text-base font-medium text-gray-900">Chi tiết sản phẩm</h2>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{products.product?.description}</p>
                  </div>
              </div>
            </div>

            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}

            {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Địa chỉ</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div> */}
          </div>
        </div>
</section>

{/* rating and reviews */}
<section>
  <h1 className='font-semibold text-lg pb-4'>Bình luận và đánh giá</h1>
  {/* <h3 className="text-xl font-bold mt-6 mb-4">Add a Review</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="rating">
            Rating:
          </label>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                type="button"
                className={`h-8 w-8 rounded-full transition-colors`}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              >
                <svg className={`h-5 w-5 ${
                  newReview.rating > i
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
            Bình luận:
          </label>
          <textarea
            placeholder='Viết bình luận'
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="comment"
            // value={newReview.comment}
            // onChange={handleReviewChange}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          type="submit"
        >
          Đăng
        </button>
      </form> */}

  <div className='border p-5 rounded-lg'>
    <Grid container spacing={7}>

      <Grid item xs={7}>
        <div className='space-y-5'>
          {[1,1,1].map((item)=> <ProductReviewCard/>)}
        </div>
      </Grid>

      <Grid item xs={5}>
        <h1 className='text-xl font-semibold pb-2'>Đánh giá của Sản phẩm</h1>
        <div className='flex items-center space-x-3'>
          <Rating value={4} precision={.5} readOnly/>
          <p className='opacity-60'>100 Đánh giá</p>
        </div>

        <Box className='mt-5 space-y-3'>
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={2}>
              <p>Xuất sắc</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress sx={{bgcolor:'#d0d0d0', borderRadius:4, height:7}} variant='determinate' value={40} color='success'/>
            </Grid>
          </Grid>
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={2}>
              <p>Rất tốt</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress sx={{bgcolor:'#d0d0d0', borderRadius:4, height:7}} variant='determinate' value={30} color='success'/>
            </Grid>
          </Grid>
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={2}>
              <p>Tốt</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress sx={{bgcolor:'#d0d0d0', borderRadius:4, height:7, color:'yellow'}} variant='determinate' value={25}/>
            </Grid>
          </Grid>
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={2}>
              <p>Tạm ổn</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress sx={{bgcolor:'#d0d0d0', borderRadius:4, height:7}} variant='determinate' value={20} color='warning'/>
            </Grid>
          </Grid>
          <Grid container alignItems='center' gap={2}>
            <Grid item xs={2}>
              <p>Tệ</p>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress sx={{bgcolor:'#d0d0d0', borderRadius:4, height:7}} variant='determinate' value={15} color='error'/>
            </Grid>
          </Grid>

        </Box>
      </Grid>
    </Grid>
  </div>
</section>

{/* similar product */}
<section className='pt-10'>
  <h1 className='py-5 text-xl font-bold'>Sản phẩm tương tự</h1>
  <div className='flex flex-wrap space-y-5'>
  {/* {[1,1,1,1,1,1,1,1,1,1].map((item)=> <Card/>)} */}
  {products && products.products?.map((item) => (
                    <ProductCard product={item}/>
                    ))}
  </div>
</section>

      </div>
    </div>
  )
}
