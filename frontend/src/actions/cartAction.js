import { addToCart, removeItemToCart, saveShippingInfo } from "../constants/cartConstants";
import axios from "axios";


// add Item To Cart
export const addItemToCart =(id, quantity)=> async(dispatch, getState)=>{

        const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch(
            {
                type: addToCart, 
                payload: {
                    // means id in product
                    product : data.product._id,
                    name: data.product.name,
                    price:data.product.price,
                    image: data.product.images[0].url,
                    stock: data.product.stock,
                    quantity, 
                },
            }
        );

// page load hune pr cart mein para data gaib na hu es liye local storage mein rakhna hu ga

localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    

}

// remove Item from cart

export const removeItemsFromCart =(id)=> async(dispatch, getState)=>{
  
    dispatch({
        type:  removeItemToCart,
        payload : id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

//Save Shipping Info

export const saveShippingInfoAction =(data)=> async(dispatch)=>{
   dispatch({
      type: saveShippingInfo,
      payload: data,
   }) 

   localStorage.setItem('shippingInfo', JSON.stringify(data));
}