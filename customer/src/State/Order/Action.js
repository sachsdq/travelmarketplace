import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionType"
import { API_BASE_URL, api } from "../../config/apiConfig"

export const createOrder = (reqData) => async(dispatch)=>{
    dispatch({type:CREATE_ORDER_REQUEST})
    try {
        const { shipAddress, selectedCartItemIds } = reqData;
        console.log("payload gui len server:",{ shipAddress, selectedCartItemIds })
        const {data} = await api.post(`/api/orders/`,
            // reqData.address,
            {shipAddress,
            selectedCartItemIds,}
            
        ) 
        if(data._id){
            reqData.navigate({ search: `step=3&order_id=${data._id}` })
        }
        console.log("data.id :  ",data._id)
        console.log("created order ...",data)
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error.message)
        dispatch({type:CREATE_ORDER_FAILURE,payload:error.message})
    }
}

export const getUserOrderHistory = () => async(dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/user`)
        // console.log("get user order history: ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const getOrderCancelled = () => async(dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/user/cancelled`)
        // console.log("get user order history: ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const getOrderDelivered = () => async(dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/user/delivered`)
        // console.log("get user order history: ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const getOrderShipped = () => async(dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/user/shipped`)
        // console.log("get user order history: ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const getOrderById = (reqData) => async(dispatch)=>{
    dispatch({type:GET_ORDER_BY_ID_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/${reqData.orderId}`)
        console.log("order by id   ",data)
        dispatch({type:GET_ORDER_BY_ID_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ORDER_BY_ID_FAILURE,payload:error.message})
    }
}

export const getAllOrders = () => async(dispatch)=>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/`)
        console.log("all order : ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const getOrderByStatus = (reqData) => async(dispatch)=>{
    const {status} = reqData
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {data} = await api.get(`/api/orders/status?status=${status}`)
        console.log("get order by status : ",data)
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
    } catch (error) {
        console.log("catch error ...",error)
        dispatch({type:GET_ALL_ORDERS_FAILURE,payload:error.message})
    }
}

export const updateOrderStatus = (reqData)=>async(dispatch)=>{
    dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
    const {orderId, newStatus} = reqData
    try {
        const {data} = await api.put(`/api/orders/updateStt`,reqData.data)

        console.log("updated order status ....",data)

        dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error.message})
    }
}

// Client-side code
// export const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/orders/updateStt`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ orderId, newStatus }),
//       });
  
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }
  
//       const updatedOrder = await response.json();
//       return updatedOrder;
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       throw error;
//     }
//   };
  
  // Usage example
//   export const handleUpdateStatus = async () => {
//     try {
//       const orderId = '123456';
//       const newStatus = 'shipped';
//       const updatedOrder = await updateOrderStatus(orderId, newStatus);
//       console.log('Updated order:', updatedOrder);
//     } catch (error) {
//       alert(`Error updating order status: ${error.message}`);
//     }
//   };

  export const placedOrders = (reqData) => async(dispatch)=>{
    dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
    try {
        const {data} = await api.put(`/api/orders/placed/${reqData.orderId}`,reqData.data)

        console.log("updated order status ....",data)

        dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error.message})
    }
  }

  export const cancelledOrders = (reqData) => async(dispatch)=>{
    dispatch({type:UPDATE_ORDER_STATUS_REQUEST})
    try {
        const {data} = await api.put(`/api/orders/cancelled/${reqData.orderId}`,reqData.data)

        console.log("updated order status ....",data)

        dispatch({type:UPDATE_ORDER_STATUS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error.message})
    }
  }