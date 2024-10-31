const Razorpay = require("razorpay")

const apiKey = "rzp_test_kTsRSaDC8hwztX"
const apiSecret = "LieoD1s9mxMIv569PcgRDMcU"

const razorpay = new Razorpay({
    key_id:apiKey,
    key_secret:apiSecret
})

// const vnpay_config = {
//     vnp_TmnCode: 'your_vnpay_merchant_id',
//     vnp_HashSecret: 'your_vnpay_hash_secret',
//     vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
//     vnp_ReturnUrl: 'http://your-domain.com/vnpay_return',
//   };

module.exports = razorpay