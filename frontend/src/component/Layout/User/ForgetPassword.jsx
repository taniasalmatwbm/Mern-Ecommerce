import React, { Fragment,useState, useEffect } from 'react'
import './ForgetPassword.css'
import Loader from '../Loader/Loader'
// import { useNavigate} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgetPassword} from '../../../actions/userAction'
import { useAlert } from 'react-alert'




const ForgetPassword =()=>{
    const dispatch = useDispatch()
  const alert = useAlert()
  const [email, setEmail]= useState()
  const {error, message, loading}= useSelector((state)=> state.forgetPassword) 

  const forgetPasswordSubmit = (e)=>{
    e.preventDefault();

    const myForm = new FormData();
   
    myForm.set("email", email)
    
    dispatch(forgetPassword(myForm))
     
  }

  useEffect(()=>{
    
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }

    if(message){
        alert.success(message)
    }

  },[dispatch, error, alert, message])

    return (
        <Fragment>
        {loading? <Loader/> :
         <Fragment>
         <div className='forgotPasswordContainer'>
         <div className='forgotPasswordBox'>
             <h2 className='forgotPasswordHeading'>Forget Password</h2>
         <form
         className="forgotPasswordForm"
         onSubmit={forgetPasswordSubmit}
       >
        
         <div className="forgotPasswordEmail">
           <MailOutlineIcon />
           <input
             type="email"
             placeholder="Email"
             required
             name="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
           />
         </div>
 
        
         <input 
         type="submit" 
         value="send" 
         className="forgotPasswordBtn" 
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

export default ForgetPassword