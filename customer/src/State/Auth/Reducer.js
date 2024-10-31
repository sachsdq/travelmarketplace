import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"


const initialState={
    user:null,
    isLoading:false,
    error:null,
    jwt:null
}

export const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case DELETE_USER_REQUEST:
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {...state, isLoading:true, error:null}

        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, isLoading:false, error:null,jwt:action.payload}

        case DELETE_USER_SUCCESS:
            return {...state, isLoading:false, error:null, deletedUser:action.payload}
        case GET_USER_SUCCESS:
            return {...state, isLoading:false, error:null, user:action.payload}

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case DELETE_USER_FAILURE:
        case GET_USER_FAILURE:
            return {...state, isLoading:false, error:action.payload}

        case LOGOUT:
            return {...initialState}


        default:
            return state
        
    }
}