import React, { Fragment, useState } from 'react';
import {SpeedDial, SpeedDialAction} from '@material-ui/lab'
import  Backdrop  from '@material-ui/core/Backdrop';
// import profile from '../../../images/Profile'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector } from "react-redux";
import { logout } from '../../../actions/userAction';
import './Header.css'



const UserOptions =({user})=>{
 
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const {cartItems} = useSelector((state)=> state.cart)

    const options= [
        { icon: <ListAltIcon/> , name: 'Orders',  func: orders},
        { icon: <ExitToAppIcon/> , name: 'Logout',  func: logoutUser},
        { icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>,
          name: `Cart(${cartItems.length})`, func: cart},
        { icon: <PersonIcon/> , name: 'Profile',  func: account},
        
    ]

    if(user.role === 'admin'){
       options.unshift({
        icon: <DashboardIcon/>,
        name: 'Dashboard',
        func: dashboard
       })
    }

    function dashboard() {
        navigate('/admin/dashboard')
    }

    function orders() {
      navigate('/orders')
    }

    function cart() {
      navigate('/cart')
    }


  function account() {
    navigate('/account')
   }

   function logoutUser() {
    dispatch(logout())
    alert.success('Logout Successfully');
   }
  return ( 
     <Fragment>
      <Backdrop open={open} style={{zIndex:'10'}}/>
          <SpeedDial
          ariaLabel='SpeedDial tooltip example'
          onClose={()=>setOpen(false)}
          onOpen={()=>setOpen(true)}
          style={{zIndex:'11', marginLeft:'5px'}}
          open={open}
          direction='down'
          className='speedDial'
          icon={
          <img
          className='SpeedDialIcon '
          src={user.avatar.url ? user.avatar.url :'/Profile.png'}
          alt='Profile'
          style={{
            width: "70px", // Adjust width
            height: "70px", // Adjust height
            borderRadius: "50%", // Makes it circular
            objectFit: "cover", // Ensures no stretching
            // border: "2px solid #ccc", // Optional border
            // marginLeft: "25px",
          }}

          />}
          >
           {
            options.map((item)=>(
              <SpeedDialAction 
              key={item.name}
              icon={item.icon} 
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen
              />
            ))
           }
          </SpeedDial>
  </Fragment>
  )  
}
export default UserOptions;