const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwtProvider = require("../config/jwtProvider")

const createUser=async(userData)=>{
    try {
        let {firstName, lastName, email, password}=userData

        const ifUserExist = await User.findOne({email})

        if(ifUserExist){
            throw new Error("người dùng đã tồn tại với email này: ", email)
        }

        password = await bcrypt.hash(password,8)
        
        const user = await User.create({firstName, lastName, email, password})

        console.log("create user", user)

        return user
    } catch (error) {
        throw new Error(error.massage)
    }
}

const findUserById = async(userId)=>{
    try {

        const user=await User.findById(userId)
        // .populate("address")
        
        if(!user){
            throw new Error("không tìm thấy người dùng với id: ", userId)
        }

        return user

    } catch (error) {
        throw new Error(error.massage)
    }
}

const deleteUserById = async(id)=>{
        // const user=await User.findById(id).populate("role").exec()
        const user = await findUserById(id)

        if(!user){
            throw new Error("khong tim thay user voi id nay",id)
        }
        console.log("deleted user ",user)
        
        await User.findByIdAndDelete(id)

        return "xóa user thành công"

}

const getUserByEmail = async(email)=>{
    try {

        const user=await User.findOne({email})

        if(!user){
            throw new Error("không tìm thấy người dùng với email: ", email)
        }

        return user

    } catch (error) {
        throw new Error(error.massage)
    }
}

const getUserProfileByToken = async(token)=>{
    try {
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserById(userId)

        if(!user){
            throw new Error("không tìm thấy người dùng với id: ", userId)
        }

        return user

    } catch (error) {
        throw new Error(error.massage)
    }
}

const getAllUsers = async()=>{
    try {
        const users = await User.find()

        return users

    } catch (error) {
        throw new Error(error.massage)
    }
}

module.exports={
    createUser, 
    findUserById, 
    getUserByEmail, 
    getUserProfileByToken, 
    getAllUsers,
    deleteUserById
}
