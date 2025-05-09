import {allProductRequest,
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
        NEW_PRODUCT_RESET,
        NEW_PRODUCT_FAIL,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_SUCCESS,
        DELETE_PRODUCT_RESET,
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

export const productsReducer =( state= { products:[] }, action)=>{

            switch (action.type) {

                case allProductRequest:
                  case ADMIN_PRODUCT_REQUEST:
                       return {
                        loading:true,
                        products:[],
                       };
                case allProductSuccess:
                        return {
                         loading: false,
                         products: action.payload.products,
                         productCount: action.payload.productCount,
                         resultPerPage: action.payload.resultPerPage,
                         filteredProductsCount: action.payload.filteredProductsCount
                        };
                case ADMIN_PRODUCT_SUCCESS:
                    return {
                         loading: false,
                         products: action.payload,
                        };
                case allProductError:
                  case ADMIN_PRODUCT_FAIL:
                        return {
                         loading:false,
                         error:action.payload, //message
                        };
                case clearError:
                        return {
                         ...state,
                         error:null,
                         };
        
                default:
                     return state;
            }

}

export const productReducer =( state= {}, action)=>{

        switch (action.type) {

            case DELETE_PRODUCT_REQUEST:
                case UPDATE_PRODUCT_REQUEST:
                   return {
                    ...state,
                    loading:true,
                   };
            case DELETE_PRODUCT_SUCCESS:
                    return {
                        ...state,
                     loading: false,
                     isDeleted: action.payload,    
                    };
            case UPDATE_PRODUCT_SUCCESS:
                        return {
                            ...state,
                         loading: false,
                         isDeleted: action.payload,    
                };
            case DELETE_PRODUCT_FAIL:
                case UPDATE_PRODUCT_FAIL:
                    return {
                     ...state,
                     loading:false,
                     error:action.payload,  
                };
            case DELETE_PRODUCT_RESET:
                        return {
                         ...state,
                        isDeleted:false,  
                    };
           case UPDATE_PRODUCT_RESET:
                        return {
                         ...state,
                        isUpdated:false,  
                    };
            case clearError:
                    return {
                     ...state,
                     error:null,
                };
    
            default:
                 return state;
        }

}


export const productDetailReducer =( state= { product:{} }, action)=>{

        switch (action.type) {

            case productDetailRequest:
                   return {
                    loading:true,
                    ...state,
                   };
            case productDetailSuccess:
                    return {
                     loading: false,
                     //.product kr k b bhj sakte hn phir action k waqt data bhjna pare gy payload nhi
                     //upr se samjh lein agr na aye samjh
                     product: action.payload,    
                    };
            case productDetailError:
                    return {
                     loading:false,
                     error:action.payload,  
                };
            case clearError:
                    return {
                     ...state,
                     error:null,
                };
    
            default:
                 return state;
        }

}

export const newReviewReducer =( state= {}, action)=>{

        switch (action.type) {

            case NEW_REVIEW_REQUEST:
                   return {
                    ...state,
                    loading:true,
                   };
            case NEW_REVIEW_SUCCESS:
                    return {
                     loading: false,
                     //.product kr k b bhj sakte hn phir action k waqt data bhjna pare gy payload nhi
                     success: action.payload,    
                    };
            case NEW_REVIEW_FAIL:
                    return {
                     ...state,
                     loading:false,
                     error:action.payload,  
                };
            case NEW_REVIEW_RESET:
                        return {
                         ...state,
                        success:false,  
                    };
            case clearError:
                    return {
                     ...state,
                     error:null,
                };
    
            default:
                 return state;
        }

}

// NEW-PRODUCT-REDUCER
export const newProductReducer =(state = { product: {} }, action)=>{

        switch (action.type) {

            case NEW_PRODUCT_REQUEST:
                   return {
                    ...state,
                    loading:true,
                   };
            case NEW_PRODUCT_SUCCESS:
                    return {
                     loading: false,
                     success: action.payload.success,    
                     product: action.payload.product,
                    };
            case NEW_PRODUCT_FAIL:
                    return {
                     ...state,
                     loading:false,
                     error:action.payload,  
                };
            case NEW_PRODUCT_RESET:
                        return {
                         ...state,
                        success:false,  
                    };
            case clearError:
                    return {
                     ...state,
                     error:null,
                };
    
            default:
                 return state;
        }

}

export const productReviewsReducer = (state = { reviews: [] }, action) => {
        switch (action.type) {
          case ALL_REVIEW_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case ALL_REVIEW_SUCCESS:
            return {
              loading: false,
              reviews: action.payload,
            };
          case ALL_REVIEW_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
      
          case clearError:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
export const reviewReducer = (state = {}, action) => {
        switch (action.type) {
          case DELETE_REVIEW_REQUEST:
            return {
              ...state,
              loading: true,
            };
          case DELETE_REVIEW_SUCCESS:
            return {
              loading: false,
              isDeleted: action.payload,
            };
          case DELETE_REVIEW_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
            };
            case DELETE_REVIEW_RESET:
                return {
                  ...state,
                  isDeleted: false,
            };
      
          case clearError:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
      
