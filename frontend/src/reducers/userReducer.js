import { loginRequest,
         loginSuccess,
         loginError,
         registerRequest,
         registerSuccess,
         registerError,
         loadRequest,
         loadSuccess,
         loadError,
         logoutSuccess,
        logoutFail,
        updateProfileRequest,
        updateProfileSuccess,
        updateProfileReset,
        updateProfileFail,
        updatePasswordSuccess,
        updatePasswordRequest,
        updatePasswordReset,
        updatePasswordFail,
        forgetPasswordSuccess,
        forgetPasswordRequest,
        forgetPasswordFail,
        resetPasswordRequest,
        resetPasswordSuccess,
        resetPasswordFail,
        ALL_USERS_REQUEST,
        ALL_USERS_SUCCESS,
        ALL_USERS_FAIL,
        DELETE_USER_REQUEST,
        DELETE_USER_SUCCESS,
        DELETE_USER_FAIL,
        DELETE_USER_RESET,
        UPDATE_USER_REQUEST,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_FAIL,
        UPDATE_USER_RESET,
        USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS,
        USER_DETAILS_FAIL,
         clearError
 } from "../constants/userConstants"



export const userReducer =( state = { 
                     user:{ }
        }, action)=>{
    
    switch(action.type){
         case loginRequest :
           case registerRequest:
            case loadRequest:
             return {
                loading: true,
                isAuthenticated: false,
             };

         case loginSuccess :
          case registerSuccess:
            case loadSuccess:
              return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
              };
        case logoutSuccess :
          return {
            loading: false,
            isAuthenticated: false,
            user: null,
          }
         case loginError :
          case registerError:
                return {
                  ...state,
                  loading: false,
                  isAuthenticated: false,
                  user: null,
                  error: action.payload,
                }
          
          case loadError:
                  return {
                  loading: false,
                  isAuthenticated: false,
                  user: null,
                  error: action.payload,
                  }
            case logoutFail: 
                  return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
            case clearError :
                    return {
                      ...state,
                      error: null,
                    }  
         default:
            return state;
    }
}

export const profileReducer =( state= { }, action)=>{
    
  switch(action.type){
       case updateProfileRequest :
          case updatePasswordRequest:
            case UPDATE_USER_REQUEST:
              case DELETE_USER_REQUEST: 
           return {
              ...state,
              loading: true,
           };

       case updateProfileSuccess:
         case updatePasswordSuccess:
          case UPDATE_USER_SUCCESS:
            return {
              ...state,
              loading: false,
              isUpdated: action.payload,
            };
      
      case updateProfileFail:
        case updatePasswordFail:
          case USER_DETAILS_FAIL:
            case DELETE_USER_FAIL:
          return {
                ...state,
                loading: false,
                error: action.payload,
              }
        case updateProfileReset :
          case updatePasswordReset:
            case UPDATE_USER_RESET:
                return {
                 ...state,
                 isUpdated: false,
                }
            case DELETE_USER_SUCCESS:
                  return {
                   ...state,
                   loading: false,
                   isDeleted: action.payload.success,
                   message: action.payload.message,
                  }
        
            case DELETE_USER_RESET:
                  return {
                   ...state,
                   isDeleted: false,
                  }
        
          case clearError :
                  return {
                    ...state,
                    error: null,
                  }  
       default:
          return state;
  }
}

export const forgetPasswordReducer =( state= {  }, action)=>{
    
  switch(action.type){
       case forgetPasswordRequest : 
        case resetPasswordRequest:
           return {
              ...state,
              loading: true,
              error: null,
           };

       case forgetPasswordSuccess:
            return {
              ...state,
              loading: false,
              message: action.payload,
            };
        case resetPasswordSuccess:
              return {
                ...state,
                loading: false,
               success: action.payload,
              };
      
      case forgetPasswordFail:
        case resetPasswordFail:
          return {
                ...state,
                loading: false,
                error: action.payload,
              }
        
          case clearError :
                  return {
                    ...state,
                    error: null,
                  }  
       default:
          return state;
  }
}

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_USERS_FAIL:
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


export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
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