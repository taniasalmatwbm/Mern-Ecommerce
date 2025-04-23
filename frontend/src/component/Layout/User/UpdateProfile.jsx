import React, { Fragment,useState, useEffect } from 'react'
import './UpdateProfile.css'
import Loader from '../Loader/Loader'
import '../../../images/Profile.png'
import {  useNavigate} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProfile, loadUser} from '../../../actions/userAction'
import { useAlert } from 'react-alert'
import {  updateProfileReset } from '../../../constants/userConstants'

const UpdateProfile = ()=>{
  
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const {user}= useSelector((state)=> state.user) 
  const {error, isUpdated, loading}= useSelector((state)=> state.profile) 
  
  const [name, setName]=useState(user.name)
  const [email, setEmail]=useState(user.email)
  const [avatar, setAvatar]=useState("")
  const [avatarPreview, setAvatarPreview]=useState(user.avatar ? user.avatar.url : "/Profile.png")

    const updateProfileSubmit = (e)=>{
        e.preventDefault();
  
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email)
        if (avatar && avatar !== user.avatar.url) {  // Fix: Only send new avatar
          myForm.set("avatar", avatar);
        }
       
        dispatch(updateProfile(myForm))
        // console.log('Sign Up Form Submitted' , myForm);   //testing
      }
  
      const updateProfileDataChange = (e)=>{
        if(e.target.name === "avatar"){
          const file = e.target.files[0];
          if (!file) return;  // Agar file select na ho toh return kar do
        
        const reader = new FileReader();

        reader.onload =()=>{
          // yaha 3 state hute hn 1, 2, 3
          if(reader.readyState === 2){
               setAvatarPreview(reader.result);  
                //avatar upload hute hi preview mein b set kr du ta ke dekhti b rehy
               setAvatar(reader.result);
          }
          //pahle file add hu gi phir fun call hu ga
        }
        //  reader.readAsDataURL(e.target.files[0]);
        reader.readAsDataURL(file);
        }else {
          if (e.target.name === "name") setName(e.target.value);
          if (e.target.name === "email") setEmail(e.target.value);
        }
    };
      
      useEffect(()=>{
        if(user){
          setName(user.name)
          setEmail(user.email)
          setAvatar(user.avatar? user.avatar.url: "");
          setAvatarPreview(user.avatar ? user.avatar.url : "/Profile.png")
        }

        if(error){
          alert.error(error)
          dispatch(clearErrors());
        }
  
        if(isUpdated){
            alert.success('Profile Updated Successfully')
            dispatch(loadUser())
           navigate('/account')

           dispatch({
            type: updateProfileReset,
           })
        }
  
      },[dispatch, error, alert, navigate, user, isUpdated])

      return (
        <Fragment>
       {loading? <Loader/> :
        <Fragment>
        <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
          
        <h2 className='updateProfileHeading'>Update Profile</h2>
        <form
        className="updateProfileForm"
        encType="multipart/form-data"
        onSubmit={updateProfileSubmit}
         >
        <div className="updateProfileName">
          <FaceIcon />
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="updateProfileEmail">
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

        <div id="updateProfileImage">
          {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
          <img src={avatarPreview || "/Profile.png"} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            // onChange={(e)=>setAvatar(e.target.value)} // issue resolved
            onChange={updateProfileDataChange}
          />
        </div>
       
        <input 
        type="submit" 
        value="update Profile" 
        className="updateProfileBtn" 
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
  
export default UpdateProfile;