const mongoose = require("mongoose")

const mondbUrl="mongodb://127.0.0.1:27017/travelmarketplace"

const connectDb = ()=>{
    return mongoose.connect(mondbUrl)
}

module.exports={connectDb}