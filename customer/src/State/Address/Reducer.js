import { GET_USER_ADDRESS_FAILURE, GET_USER_ADDRESS_REQUEST, GET_USER_ADDRESS_SUCCESS } from "./ActionType"

const initialState = {
    addresses:[],
    address:null,
    loading:false,
    error:null
}

export const customerAddressReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_USER_ADDRESS_REQUEST:
            return {...state, loading:true, error:null}

        case GET_USER_ADDRESS_SUCCESS:
            return {...state, loading:false, error:null,address:action.payload}

        case GET_USER_ADDRESS_FAILURE:
            return {...state, error: action.payload, loading:false}

        default:
            return state
    }
}