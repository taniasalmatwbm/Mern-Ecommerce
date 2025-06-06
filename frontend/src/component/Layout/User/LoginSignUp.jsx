import React, { Fragment, useRef, useState, useEffect } from 'react'
import './LoginSignUp.css'
import Loader from '../Loader/Loader'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login, register } from '../../../actions/userAction'
import { useAlert } from 'react-alert'

// in ki help se react mein direct dom node ko access kr sakte hn aur jb us mein khxh update
//  kare gy to ye component ko reRender nhi krta
const LoginSignUp =()=> {
  const dispatch = useDispatch()
  const alert = useAlert()
  const location= useLocation()
  const navigate =useNavigate()
    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)
    
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const {error, loading, isAuthenticated}= useSelector((state)=> state.user)
    const [user, setUser] =useState({
      name :"",
      email:"",
      password:"",

    })

    const {name, email, password} = user;

    const [avatar, setAvatar]=useState("")
    const [avatarPreview, setAvatarPreview]=useState("/Profile.png")
    // const [ ]=useState()

    const loginSubmit =(e)=>{
        e.preventDefault();

        dispatch(login(loginEmail, loginPassword))
        console.log('Login Form Submitted')
    }
    
    const registerSubmit = (e)=>{
      e.preventDefault();
//multi/part form of data
      const myForm = new FormData();
      myForm.set("name", name)
      myForm.set("email", email)
      myForm.set("password", password)
      if (avatar) {
        myForm.set("avatar", avatar);
      }
      //console.log("FormData:", myForm);
      dispatch(register(myForm))
      //.log('Sign Up Form Submitted');  
    }

    const registerDataChange = (e)=>{
        if(e.target.name === "avatar"){
          const file = e.target.files[0];
          if (!file) return;  // Agar file select na ho toh return kar do
        
        const reader = new FileReader();

        reader.onload =()=>{
          // yaha 3 state hute hn 1, 2, 3
         // DONE	2	The entire read request has been completed.
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
          setUser({...user, [e.target.name]: e.target.value })
        }
    };
                       // true condition mein /shipping pr redirect hu ga
    const redirect = location.search ? location.search.split('=')[1] : "/account";
    // const redirect = new URLSearchParams(location.search).get('redirect') || '/account';

    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }

      if(isAuthenticated){
         navigate(redirect)
      }

    },[dispatch, error, alert, redirect, isAuthenticated])

    const switchTabs =(e, tab)=>{
        if(tab === 'login'){
            switcherTab.current.classList.add('shiftToNeutral') 
            switcherTab.current.classList.remove('shiftToRight')

            registerTab.current.classList.remove('shiftToNeutralForm') 
            loginTab.current.classList.remove('shiftToLeft')
        }
        if(tab === 'register'){
            switcherTab.current.classList.add('shiftToRight') 
            switcherTab.current.classList.remove('shiftToNeutral')

            registerTab.current.classList.add('shiftToNeutralForm') 
            loginTab.current.classList.add('shiftToLeft')
        }
    }

    return (
      <Fragment>
        { loading ? <Loader/> :
        <Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switchTabs(e, 'login')}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e, 'register')}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                  <div className='loginEmail'>
                      <MailOutlineIcon/>
                      <input
                      type='email'
                      placeholder='Email'
                      required
                      value={loginEmail}
                      onChange={(e)=> setLoginEmail(e.target.value)}
                      />
                  </div>
                  <div className='loginPassword'>
                    <LockOpenIcon/>
                    <input
                    type='password'
                    placeholder='Password'
                    required
                    value={loginPassword}
                    onChange={(e)=> setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to="/password/forget">Forget Password ? </Link>
                  <input type='submit' value='Login' className='loginBtn'/>
                </form>

             <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
           
            <input 
            type="submit" 
            value="Register" 
            className="signUpBtn" 
            // disabled={loading ? true : false}
            />

          </form>


            </div>

        </div>
     </Fragment>
        }
      </Fragment>

         
    );
};

export default LoginSignUp