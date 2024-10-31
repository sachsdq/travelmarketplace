import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_ALL_CATEGORY_FAILURE, GET_ALL_CATEGORY_REQUEST, GET_ALL_CATEGORY_SUCCESS, GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAILURE, GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "./ActionType"

const initialState = {
    products:[],
    product:null,
    loading:false,
    error:null
}

export const customerProductReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_ALL_PRODUCTS_REQUEST:
        case GET_ALL_CATEGORY_REQUEST:
        case GET_PRODUCT_BY_CATEGORY_REQUEST:
        case FIND_PRODUCTS_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {...state, loading:true, error:null
            }
        case FIND_PRODUCT_BY_ID_REQUEST:
            return {...state, loading:true, error:null}

        case GET_ALL_PRODUCTS_SUCCESS:
            return {...state, loading:false, error:null,products:action.payload}
        case GET_ALL_CATEGORY_SUCCESS:
            return {...state, loading:false, error:null,products:action.payload}
        case GET_PRODUCT_BY_CATEGORY_SUCCESS:
            return {...state, loading:false, error:null,products:action.payload}
        case FIND_PRODUCTS_SUCCESS:
            return {...state, loading:false, error:null,products:action.payload}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading:false, error:null,product:action.payload}
        case UPDATE_PRODUCT_SUCCESS:
            return {...state, updatedProduct: action.payload, loading:false}
        case DELETE_PRODUCT_SUCCESS:
            return{...state, loading:false, error:null, 
                deletedProduct:action.payload}

        case GET_ALL_PRODUCTS_FAILURE:
        case GET_ALL_CATEGORY_FAILURE:
        case GET_PRODUCT_BY_CATEGORY_FAILURE:
        case FIND_PRODUCTS_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
            return {...state, error: action.payload, loading:false}
        case FIND_PRODUCT_BY_ID_FAILURE:
            return {...state, loading:false, error:action.payload}
        default:
            return state
    }
}
