import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { newProductReducer,
         newReviewReducer,
         productDetailReducer, 
         productReducer,
         productsReducer, 
         productReviewsReducer, 
         reviewReducer} from "./reducers/productReducer";
import { allUsersReducer, 
         forgetPasswordReducer, 
         profileReducer, 
         userDetailsReducer, 
         userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer,
         myOrdersReducer, 
         newOrderReducer,
         orderDetailsReducer, 
         orderReducer } from "./reducers/orderReducer";



// Initial state (can populate this with default values)
let initialState = {
    cart: {
       cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) 
       : [] ,
 
       shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo"))
       : {},
    }
    
 };

 // Middleware array (including thunk for handling async actions)
const middleware = [thunk];
//console.log("thunk", middleware)
// Create the store using createStore from redux


 
// Combine reducers (can add your specific reducers here)
const reducer = combineReducers({
    // your reducers go here
    // product reducers
    products: productsReducer,
    productDetails: productDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    // user reducers
    user: userReducer,
    profile: profileReducer,
    forgetPassword: forgetPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,

    //  cart reducer
    cart: cartReducer,

    //  order reducers
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    
    
    
});

const store = createStore(
    reducer, // Root reducer   first pr hi rakhna h
    initialState, // Initial state
    //Creates a store enhancer that applies middleware to the dispatch method of the Redux store.
    composeWithDevTools(applyMiddleware(...middleware)) // Apply middleware and enable Redux DevTools
);
//console.log("middelware", middleware)
//console.log("middleware functionality", composeWithDevTools(applyMiddleware(...middleware)))
export default store;
