import { API_BASE_URL, api } from "../../config/apiConfig"
import { GET_USER_ADDRESS_FAILURE, GET_USER_ADDRESS_REQUEST, GET_USER_ADDRESS_SUCCESS } from "./ActionType"

export const getUserAddress = () => async (dispatch) => {
    dispatch({type:GET_USER_ADDRESS_REQUEST})
    try {
        const {data} = await api.get(`/api/address`)
        // console.log("all user address: ",data)
        dispatch({type:GET_USER_ADDRESS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_USER_ADDRESS_FAILURE,payload:error.message})
    }
}