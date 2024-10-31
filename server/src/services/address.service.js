const Address = require("../models/address.model");

async function getUserShipAddress(userId){
    try {
        const address = await Address.find({user:userId}).populate("user")
        return address
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getUserShipAddress
}