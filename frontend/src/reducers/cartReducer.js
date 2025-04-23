import { addToCart,
    removeItemToCart,
    saveShippingInfo
    } from "../constants/cartConstants";



export const cartReducer = (state = {
                     cartItems: [], 
                     shippingInfo: {}
                      }, action) =>{
    
 switch (action.type) {
   
    case addToCart:
        const item = action.payload;
        const isItemExist = state.cartItems.find(
            (i)=> i.product === item.product
        );

       if(isItemExist){
         return {
            ...state,
            cartItems: state.cartItems.map(
               (i)=> i.product === isItemExist.product ? item : i),
           }
       }else {
        return  {
           ...state,
           cartItems: [...state.cartItems, item],
        };
       }
      
       case removeItemToCart:
         return {
            ...state,
            cartItems : state.cartItems.filter((i)=>i.product !== action.payload),
         };
       case saveShippingInfo:
         return {
            ...state,
            shippingInfo : action.payload,
         }

       default:
         return state;
 }
}