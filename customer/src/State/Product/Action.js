import { API_BASE_URL, api } from "../../config/apiConfig"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_ALL_CATEGORY_FAILURE, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAILURE, GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./ActionType"

export const getAllProduct = (reqData) => async (dispatch) => {
    dispatch({type:GET_ALL_PRODUCTS_REQUEST})
    const {
        category
    } = reqData
    try {
        const {data} = await api.get(`/api/products?category=${category}`)
        // console.log("all product: ",data)
        dispatch({type:GET_ALL_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_PRODUCTS_FAILURE,payload:error.message})
    }
}

export const getAllProductsSaler=(reqData)=>async(dispatch)=>{
    dispatch({type:GET_ALL_PRODUCTS_REQUEST})
    const {category} = reqData
    try {

        const {data} = await api.get(`/api/products/saler`)

        // console.log("all product...",data)
        dispatch({type:GET_ALL_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_PRODUCTS_FAILURE,payload:error.message})
    }
}

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCTS_REQUEST})
    const {
        colors,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize
    } = reqData
    console.log("category nà ",reqData)
    try {
        // const {product} = await api.get("/api/products")
        // console.log("product nà",product)
        const {data}= await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&
        maxPrice=${maxPrice}&minDiscount=${minDiscount}&
        category=${category}&
        stock=${stock}&
        sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

        // console.log("product data ", data)
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message})
    }
}

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
    // const {productId} = reqData

    try {
        const {data}= await api.get(`/api/products/id/${reqData.productId}`)
        console.log("data ",data)
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message})
    }
}

export const createProduct=(product)=>async(dispatch)=>{
    console.log("create product data....",product)
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST})

        const {data}= await api.post(`/api/admin/products/`,product)

        console.log("created products", data)
        dispatch({type:CREATE_PRODUCT_SUCCESS, payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:CREATE_PRODUCT_FAILURE, payload:error.message})
    }
}

export const deleteProduct=(productId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        const {data}= await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`)

        console.log("delete product ....",data)
        dispatch({type:DELETE_PRODUCT_SUCCESS, payload:productId})
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAILURE, payload:error.message})
    }
}

export const updateProduct = (reqData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST})

        const {data} = await api.put(`${API_BASE_URL}/api/admin/products/${reqData.productId}`,reqData.data)

        // console.log("updated product ....",data)

        dispatch({type:UPDATE_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_PRODUCT_FAILURE, payload:error.message})
    }
}

export const getAllCategory=(reqData)=>async(dispatch)=>{
    dispatch({type:GET_ALL_CATEGORY_REQUEST})
    const {} = reqData
    try {

        const {data} = await api.get(`/api/products/category`)

        // console.log("all category ...",data)
        dispatch({type:GET_ALL_CATEGORY_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_ALL_CATEGORY_FAILURE,payload:error.message})
    }
}
