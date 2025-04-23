import {   loginRequest,
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
           updateProfileFail,
           updatePasswordSuccess,
           updatePasswordRequest,
           updatePasswordReset,
           updatePasswordFail,
           forgetPasswordRequest,
           forgetPasswordSuccess,
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

import axios from 'axios'


export const login =(email, password)=> async(dispatch)=>{

    try{
        dispatch({type: loginRequest});
        
        const config = { headers:{"Content-Type" : "application/json"}}
        
        const {data} = await axios.post(
            '/api/v1/login',
             {email,password},
             config
        );

        dispatch({type: loginSuccess, payload: data.user});

    }catch(error){
        dispatch({type: loginError, payload: error.response.data.message})
    }
    

}


export const register =(userData)=> async(dispatch)=>{

    try{
        dispatch({type: registerRequest});
        
        const config = { headers:{"Content-Type" : "multipart/form-data"}}
        
        const {data} = await axios.post(
            '/api/v1/register',
             userData,
             config
        );

        dispatch({type: registerSuccess, payload: data.user});

    }catch(error){
        dispatch({type: registerError,
                  payload: error.response.data.message
                })
    }
    

}


export const loadUser =()=> async(dispatch)=>{
    //(action, ...args) => dispatch(action, ...args)
      //console.log("action Dispatch mein kiya ata h ", dispatch)
    try{
        dispatch({type: loadRequest});
        
        // agr ham login hn yaha pr sari information mil jati h
        const { data } = await axios.get('/api/v1/me');
//       console.log("getprofiledetail",data)
 //      {success: true, user: {…}}
      // success: true, 
      // user: avatar : {public_id: 'avatars/m93o4ca7ujrsepk4ifwr',
      //       url: 'https://res.cloudinary.com/do0m7bzx6/image/upload/v1739543351/avatars/m93o4ca7ujrsepk4ifwr.jpg'}
//             createdAt :  "2025-02-14T14:29:11.564Z",
//             email: "taniya@gmail.com",
//             name : "Taniya Salamat"
//             role : "admin",
//             __v: 0, 
//             _id :  "67af5337fd227dde0ba57b35"

        dispatch({type: loadSuccess, payload: data.user});

    }catch(error){
        dispatch({type: loadError, payload: error.response.data.message})
    }
    
}

export const logout =()=> async(dispatch)=>{

    try{ 
       
         await axios.get('/api/v1/logout');
        //console.log(data)
        dispatch({type: logoutSuccess});

    }catch(error){
        dispatch({type: logoutFail, payload: error.response.data.message})
    }
    
}
//UpdateProfile
export const updateProfile =(userData)=> async(dispatch)=>{

    try{
        dispatch({type: updateProfileRequest});
        
        const config = { headers:{"Content-Type" : "multipart/form-data"}}
        
        const {data} = await axios.put(
            '/api/v1/me/update',
             userData,
             config
        );

        dispatch({type: updateProfileSuccess, payload: data.success});

    }catch(error){
        dispatch(
            {     type: updateProfileFail,
                  payload: error.response.data.message,
            }
        )
    }
    

}

//update forgetPassword

export const updatePassword =(passwords)=> async(dispatch)=>{

    try{
        console.log("update password Action",passwords) // Now with plain formData passwords all coming in console but error is same
        dispatch({type: updatePasswordRequest});
        
        const config = { headers:{"Content-Type" : "application/json"}}
        
        const {data} = await axios.put(
            '/api/v1/password/update',
            JSON.stringify(passwords),
             config
        );

        dispatch({type: updatePasswordSuccess, payload: data.success});

    }catch(error){
        console.log(error)
        dispatch(
            {     type: updatePasswordFail,
                  payload: error.response.data.message,
            }
        )
    }
    

}

// forgetPassword
export const forgetPassword =(email)=> async(dispatch)=>{

    try{
        dispatch({type: forgetPasswordRequest});
        
        const config = { headers:{"Content-Type" : "application/json"}}
        
        const {data} = await axios.post(
            '/api/v1/password/forget',
             email,
             config
        );
          // console.log("url data send,", data)
        dispatch({type: forgetPasswordSuccess, payload: data.message});

    }catch(error){
        dispatch({type: forgetPasswordFail, payload: error.response.data.message})
    }
    

}

//ResetPassworD

export const resetPassword =(token, passwords)=> async(dispatch)=>{

    try{
        dispatch({type: resetPasswordRequest});
        
        const config = { headers:{"Content-Type" : "application/json"}}
        
        const {data} = await axios.put(
            `/api/v1/password/reset/${token}`,
             passwords,
             config
        );

        dispatch({type: resetPasswordSuccess, payload: data.success});

    }catch(error){
        dispatch(
            {
                type: resetPasswordFail, 
                payload: error.response.data.message
            })
    }
    

}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
 // Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
    await dispatch({ type: clearError })
}