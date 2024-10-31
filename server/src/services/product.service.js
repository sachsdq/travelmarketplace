const Category = require("../models/category.model")
const Product = require("../models/product.model")

async function createProduct(reqData){
    // let topLevel = await Category.findOne({name:reqData.topLevelCategory})

    // if(!topLevel){
    //     topLevel=new Category({
    //         name:reqData.topLevelCategory,
    //         level:1
    //     })
    //     await topLevel.save()
    // }

    // let secondLevel = await Category.findOne({
    //     name:reqData.secondLevelCategory,
    //     parentCategory: topLevel._id
    // })

    // if(!secondLevel){
    //     secondLevel = new Category({
    //         name:reqData.secondLevelCategory,
    //         parentCategory:topLevel._id,
    //         level:2
    //     })
    //     await secondLevel.save()
    // }

    // let thirdLevel = await Category.findOne({
    //     name:reqData.thirdLevelCategory,
    //     parentCategory: secondLevel._id,
    // })

    // if(!thirdLevel){
    //     thirdLevel = new Category({
    //         name:reqData.thirdLevelCategory,
    //         parentCategory:secondLevel._id,
    //         level:3
    //     })
    //     await thirdLevel.save()
    // }

    let newCategory = await Category.findOne({name:reqData.productCategory})

    if(!newCategory){
        newCategory=new Category({
            name:reqData.productCategory,
            level:1,
            parentCategory:newCategory?._id
        })
        await newCategory.save()
    }

    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountPercent:reqData.discountPercent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        // category:thirdLevel._id,
        category:newCategory?._id

    })
    // console.log("category nè: ",product.category)
    return await product.save()
}

async function deleteProduct(productId){
    const product = await findProductById(productId)

    await Product.findByIdAndDelete(productId)
    return "Xóa sản phẩm thành công"
}

async function updateProduct(productId, reqData){
    const product =  await Product.findByIdAndUpdate(productId,reqData)

    // if(product._id.toString() === productId.toString()){
    //     product.title += reqData.title
    //     const updatedProduct = await product.save()
        // console.log("product này nè",product)
    //     return updatedProduct
    // }

    console.log("updating product ...",product)
    console.log("updating product id ...",productId)
    console.log("updating product data ...",reqData)
    return await product.save()
}

async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec()

    if(!product){
        throw new Error("Không tìm thấy sản phẩm với id "+id)
    }
    return product
}

// async function getAllProducts(reqQuery){
//     let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}= reqQuery
    
//     pageSize = pageSize || 10
//     // console.log("reqQuery",reqQuery)
//     let query = Product.find().populate("category")
//     // console.log("query",query)
//     if(category){
//         const existCategory = await Category.findOne({name:category})
//         console.log("category này: ",category)
//         if(existCategory){
//             query = query.where("category").equals(existCategory?._id)
//         }
//         else{
//             return{content:[], currentPage:1, totalPages:0}
//         }
//     }

//     if(color){
//         const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()))
//         const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null
//         query = query.where("color").regex(colorRegex)
//     }

//     if(sizes){
//         const sizesSet = new Set(sizes)
//         query = query.where("sizes.name").in([...sizesSet])
//     }

//     if(minPrice && maxPrice){
//         query = query.where("discountedPrice").gte(minPrice).lte(maxPrice)
//     }

//     if(minDiscount){
//         query = query.where("discountPercent").gt(minDiscount)
//     }

//     if(stock){
//         if(stock=="in_stock"){
//             query = query.where("quantity").gt(0)
//         }
//         else if(stock=="out_of_stock"){
//             query = query.where("quantity").gt(1)
//         }
//     }

//     if(sort){
//         const sortDirection = sort ==="price_hight"?-1:1
//         query = query.sort({discountedPrice:sortDirection})
//     }

//     const totalProducts = await Product.countDocuments(query)

//     const skip = (pageNumber-1)*pageSize

//     query = query.skip(skip).limit(pageSize)

//     const products = await query.exec()

//     const totalPages = Math.ceil(totalProducts/pageSize)

//     return {content:products, currentPage:pageNumber, totalPages}
// }

async function getAllProducts(reqQuery){
    let{category}=reqQuery
    let query = Product.find().populate("category")
    if(category){
        const existCategory = await Category.findOne({name:category})

        if(existCategory){
            query = query.where("category").equals(existCategory?._id)
        }
        else{
            return query
        }
        
    }
    const product = await query.exec()
    
    return product
}

const getAllProductsSaler = async()=>{
    try {
        const product = await Product.find()
        return product
    } catch (error) {
        throw new Error(error.massage)
    }
}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product)
    }
}

const getAllCategory = async()=>{
    try {
        const categories = await Category.find()
        return categories
    } catch (error) {
        throw new Error(error.massage)
    }
}

const getProductByCategory = async(categoryName) => {
    try {
        const product = await Product.find({category:categoryName})
        return product
    } catch (error) {
        throw new Error(error.massage)
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllProductsSaler,
    findProductById, 
    createMultipleProduct,
    getAllCategory,
    getProductByCategory
}