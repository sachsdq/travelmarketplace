const productService = require("../services/product.service")

const createProduct = async (req,res)=>{
    // const productId = req.params.id
    try {
        const product = await productService.createProduct(req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deleteProduct = async (req,res)=>{
    const productId = req.params.id
    try {
        const product = await productService.deleteProduct(productId)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const updateProduct = async (req,res)=>{
    const productId = req.params.id
    try {
        const product = await productService.updateProduct(productId,req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const findProductById = async (req,res)=>{
    const productId = req.params.id
    try {
        const product = await productService.findProductById(productId)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllProducts = async (req,res)=>{
    const productId = req.params.id
    try {
        const products = await productService.getAllProducts(req.query)
        // req.query
        // console.log(products)
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllProductsSaler = async(req,res)=>{
    const productId = req.params.id
    try {
        const products = await productService.getAllProductsSaler()
        // req.query
        // console.log(products)
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const createMultipleProduct = async (req,res)=>{
    const productId = req.params.id
    try {
        const product = await productService.createMultipleProduct(req.body)
        return res.status(201).send({message:"Product created successfully"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllCategory = async(req,res)=>{
    try {
        const category = await productService.getAllCategory()
        return res.status(200).send(category)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getProductByCategory = async(req,res)=>{
    const categoryName = req.params
    try {
        const product = await productService.getProductByCategory(categoryName)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllProductsSaler,
    createMultipleProduct,
    findProductById,
    getAllCategory,
    getProductByCategory
}