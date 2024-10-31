const addressService = require("../services/address.service")

const getUserShipAddress = async(req,res)=>{
    const user = await req.user
    try {
        const address = await addressService.getUserShipAddress(user?._id)
        return res.status(200).send(address)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    getUserShipAddress
}