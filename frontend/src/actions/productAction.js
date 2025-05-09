import axios from "axios";
import {
    allProductRequest,
    allProductSuccess,
    allProductError,
    productDetailRequest,
    productDetailSuccess,
    productDetailError,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL, 
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    clearError
} from "../constants/productConstants"

export const getProduct = (
  keyword = "",
  price = [0, 25000],
  category,
  ratings = 0
) => async (dispatch) => {
  try {
    dispatch({ type: allProductRequest });

    let link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    
    if (category) {
      link += `&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: allProductSuccess,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: allProductError,
      payload: error.response.data.message,
    });
  }
};



//  export const getProduct = (
//   keyword = "",
//   price = [0, 25000],
//   category,
//   ratings = 0
// ) => async (dispatch) => {
//   try {
//     dispatch({ type: allProductRequest });

//     let link = `/api/v1/products`;

//     const queryParams = [];

//     if (keyword && keyword.trim() !== "") {
//       queryParams.push(`keyword=${keyword}`);
//     }

//     if (price && price.length === 2) {
//       queryParams.push(`price[gte]=${price[0]}`);
//       queryParams.push(`price[lte]=${price[1]}`);
//     }

//     if (category) {
//       queryParams.push(`category=${category}`);
//     }

//     if (ratings > 0) {
//       queryParams.push(`ratings[gte]=${ratings}`);
//     }

//     if (queryParams.length > 0) {
//       link += `?${queryParams.join("&")}`;
//     }

//     const { data } = await axios.get(link);
//     console.log("backend Product Data", data);

//     dispatch({
//       type: allProductSuccess,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: allProductError,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };




// Pagination remove kar diya (no page param anymore)
// Empty keyword, category, etc. tabhi query mein jaayenge jab unki value ho
// Link dynamically build ho raha hai — clean & safe
// Error message safely handle ho raha hai (error.response?.data?.message || error.message)

// export const getProduct = ( 
//               keyword ="", 
//               currentPage = 1,
//               price=[0, 25000],
//               category, 
//               ratings=0
//              )=>  async (dispatch)=>{
//               try {
//                 dispatch({ type: allProductRequest });
//                 let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            
//                 if(category){
//                 link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}` 
//                  }
            
//                const {data} = await axios.get(link)
//                  console.log("backend Product Data", data) 
//                 //  jo b backend mein data hu ga a jaye ga
//                 //   {success: true, products: Array(4), productCount: 4, resultPerPage: 20, filteredProductsCount: 4}
//                 dispatch({
//                 type: allProductSuccess,
//                 payload: data,
//                });
//                }catch(error){
          
//                  dispatch({
//                  type: allProductError,
//                  payload: error.response.data.message
//                 });
//             }
//     }
// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create Product
export const createProduct = (productData)=>  async (dispatch)=>{

  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config ={ headers:{"Content-Type": "multipart/form-data"} };

    const {data} = await axios.post(`/api/v1/admin/product/new`, 
      productData,
      config
    )

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data.product,
    });
  }catch(error){
    
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

//Update Product
export const updateProduct = (id, productData)=>  async (dispatch)=>{

  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config ={
      headers:{"Content-Type": "application/json"},
    }

    const {data} = await axios.put(`/api/v1/admin/product/${id}`, 
      productData,
      config
    )

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  }catch(error){
    
      dispatch({
          type: UPDATE_PRODUCT_FAIL,
          payload: error.response.data.message
      });
  }
}

//data kiya bhjna h or url kiya hu ga jis pr bhjna h
    export const getProductDetails = (id)=>  async (dispatch)=>{

      try {
        dispatch({ type: productDetailRequest });

        const {data} = await axios.get(`/api/v1/product/${id}`)
 
        dispatch({
          type: productDetailSuccess,
          payload: data.product,
        });
      }catch(error){
        
          dispatch({
              type: productDetailError,
              payload: error.response.data.message
          });
      }
  }

  // newReview data
  export const newReview = (reviewData)=>  async (dispatch)=>{

    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const config ={
        headers:{"Content-Type": "application/json"},
      }

      const {data} = await axios.put(`/api/v1/review`, reviewData,config)

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    }catch(error){
      
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

// get All Product Reviews
export const getAllReviews = (id)=>  async (dispatch)=>{

  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
    
    const {data} = await axios.get(`/api/v1/allReviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  }catch(error){
    
      dispatch({
          type: ALL_REVIEW_FAIL,
          payload: error.response.data.message
      });
  }
}
//delete reviews by id
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/allReviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
   await dispatch({ type: clearError })
  }

