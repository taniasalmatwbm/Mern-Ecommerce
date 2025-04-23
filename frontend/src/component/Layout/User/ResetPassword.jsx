import React, {useState, Fragment, useEffect}from 'react'
import './ResetPassword.css'
import Loader from '../Loader/Loader'
import {  useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, resetPassword} from '../../../actions/userAction'
import { useAlert } from 'react-alert'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";




const ResetPassword =()=>{

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const {token} = useParams()
    
    
   
    const [password, setPassword]=useState("")
    const [confirmedPassword, setConfirmedPassword]=useState("")
    const {error, success, loading}= useSelector((state)=> state.forgetPassword) 
  
    
  
      const resetPasswordSubmit = (e)=>{
          e.preventDefault();
    
          const passwords = {
            password,
            confirmedPassword
        };
          dispatch(resetPassword(token, passwords))
          console.log('update password submitted');  
        }
    
       
        useEffect(()=>{
         
          if(error){
            alert.error(error)
            dispatch(clearErrors());
          }
    
          if(success){
              alert.success('Password Reset Successfully')
             navigate('/login')
          }
    
        },[dispatch, error, alert, navigate, success])
  
    return (
        <Fragment>
       {loading? <Loader/> :
        <Fragment>
        <div className='resetPasswordContainer'>
        <div className='resetPasswordBox'>
            <h2 className='resetPasswordHeading'>Update Password</h2>
        <form
        className="resetPasswordForm"
        onSubmit={resetPasswordSubmit}
      >
      
        <div>
                <LockOpenIcon/>
                    <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
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
        value="Update" 
        className="resetPasswordBtn" 
        />

      </form>
        </div>
        </div>
    </Fragment>
       } 
      
        </Fragment>
    )
}

export default ResetPassword