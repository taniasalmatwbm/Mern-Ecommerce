import React, {useState, Fragment, useEffect}from 'react'
import './UpdatePassword.css'
import Loader from '../Loader/Loader'
import {  useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword} from '../../../actions/userAction'
import { useAlert } from 'react-alert'
import {  updatePasswordReset } from '../../../constants/userConstants'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


const UpdatePassword =()=>{
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  
  
  const {error, isUpdated, loading}= useSelector((state)=> state.profile) 
  const [oldPassword, setOldPassword]=useState("")
  const [newPassword, setNewPassword]=useState("")
  const [confirmedPassword, setConfirmedPassword]=useState("")

  

    const updatePasswordSubmit = (e)=>{
        e.preventDefault();
  
        const passwords = {
          oldPassword,
          newPassword,
          confirmedPassword
      };
        dispatch(updatePassword(passwords))
        console.log('update password submitted');  
      }
  
     
      useEffect(()=>{
       
        if(error){
          alert.error(error)
          dispatch(clearErrors());
        }
  
        if(isUpdated){
            alert.success('Profile Updated Successfully')
           
           navigate('/account')

           dispatch({
            type: updatePasswordReset,
           })
        }
  
      },[dispatch, error, alert, navigate, isUpdated])

    return (
        <Fragment>
       {loading? <Loader/> :
        <Fragment>
        <div className='updatePasswordContainer'>
        <div className='updatePasswordBox'>
            <h2 className='updatePasswordHeading'>Update Password</h2>
        <form
        className="updatePasswordForm"
        encType="multipart/form-data"
        onSubmit={updatePasswordSubmit}
      >
        <div className='loginPassword'>
                    <VpnKeyIcon/>
                    <input
                    type='password'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e)=> setOldPassword(e.target.value)}
                    />
          </div>
        <div className='loginPassword'>
                    <LockOpenIcon/>
                    <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e)=> setNewPassword(e.target.value)}
                    />
        </div>
        <div className='loginPassword'>
                    <LockIcon/>
                    <input
                    type='password'
                    placeholder='Confirmed Password'
                    required
                    value={confirmedPassword}
                    onChange={(e)=> setConfirmedPassword(e.target.value)}
                    />
        </div>
       
        <input 
        type="submit" 
        value="change" 
        className="updatePasswordBtn" 
        // disabled={loading ? true : false}
        />

      </form>
        </div>
        </div>
    </Fragment>
       } 
      
        </Fragment>
    )
}

export default UpdatePassword;

