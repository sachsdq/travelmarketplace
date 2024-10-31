import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
  return (
    <div>
        <Grid container spacing={2} gap={6} className='border rounded-lg'>

            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{width:56, height:56, bgcolor:'#9155fd'}}>A</Avatar>
                </Box>
            </Grid>

            <Grid item xs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'>An nguyễn</p>
                        <p className='opacity-70'>20/5/2024</p>
                    </div>
                </div>

                <Rating value={4} name='half-rating' readOnly precision={.5}/>
                <p>sản phẩm đúng như mô tả, thanks shop</p>
            </Grid>
        </Grid>
        {/* <h2>Bình luận, đánh giá về sản phẩm này</h2>
        <ul>
            {reviews.map((review) => (
            <li key={review._id}>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
                <p>- {review.user.name}</p>
            </li>
            ))}
        </ul>
        <h3>Thêm một bình luận</h3>
        <form onSubmit={handleReviewSubmit}>
            <label>
            Đánh giá:
            <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={handleReviewChange}
            />
            </label>
            <label>
            Bình luận:
            <textarea name="comment" value={newReview.comment} onChange={handleReviewChange} />
            </label>
            <button type="submit">Đăng</button>
        </form> */}
    </div>
  )
}

export default ProductReviewCard