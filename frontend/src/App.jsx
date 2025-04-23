
// import {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// The Elements provider allows you to use Element components and access the Stripe
// object in any nested component.
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store'
import { loadUser } from './actions/userAction'
import axios from 'axios'
import Header  from './component/Layout/Header/Header'
import Footer from './component/Layout/Footer/Footer'
import UserOptions from './component/Layout/Header/UserOptions.jsx';
import './App.css'
import ProductDetails from './component/Layout/Home/ProductDetails.jsx';
import Home from './component/Layout/Home/Home.jsx';
import Products from './component/Layout/Home/Products.jsx';
import Search from './component/Layout/Home/Search.jsx';
import LoginSignUp from './component/Layout/User/LoginSignUp.jsx';
import Profile from './component/Layout/User/Profile.jsx';
import ProtectedRoute from './component/Layout/Route/ProtectedRoute.jsx'
import UpdateProfile from './component/Layout/User/UpdateProfile.jsx';
import UpdatePassword from './component/Layout/User/UpdatePassword.jsx';
import ResetPassword from './component/Layout/User/ResetPassword.jsx';
import Cart from './component/Layout/Cart/Cart.jsx';
import ConfirmOrder from './component/Layout/Cart/ConfirmOrder.jsx';
import Payment from './component/Layout/Cart/Payment.jsx';
import ForgetPassword from './component/Layout/User/ForgetPassword.jsx';
import Shipping from './component/Layout/Cart/Shipping.jsx';
import OrderSuccess from './component/Layout/Cart/OrderSuccess.jsx'
import MyOrders from './component/Layout/Cart/MyOrders.jsx'
import OrderDetails from './component/Layout/Cart/OrderDetails.jsx'
import NewProduct from './component/Layout/Admin/NewProduct.jsx'
import UpdateProduct from './component/Layout/Admin/UpdateProduct.jsx'
import OrderList from './component/Layout/Admin/OrderList.jsx'
import ProcessOrder from './component/Layout/Admin/ProcessOrder.jsx'
import UsersList from './component/Layout/Admin/UsersList.jsx'
import ProductReviews from './component/Layout/Admin/ProductReviews.jsx'
import DashBoard from './component/Layout/Admin/DashBoard.jsx'
import ProductList from './component/Layout/Admin/ProductList.jsx'
import About from './component/Layout/Header/About.jsx';
import Contact from './component/Layout/Header/Contact.jsx';
import UpdateUser from './component/Layout/Admin/UpdateUser.jsx';



function App() {

  const {isAuthenticated, user}= useSelector((state)=>state.user)
  const [stripeApiKey, setStripeApiKey] = useState("")
  

  // async function getStripeApiKey() {

  //   const {data} = await axios.get("/api/v1/stripeapikey")
  //   setStripeApiKey(data.stripeApiKey)
    
  // }

  // // console.log(user)
  // useEffect (()=>{
  //   store.dispatch(loadUser())
  //   getStripeApiKey()
  //  }, [])
  
  // another way
  useEffect(() => {
    //Dispatches an action. It is the only way to trigger a state change.
    store.dispatch(loadUser());   

    const fetchStripeApiKey = async () => {
      try{
        const { data } = await axios.get("/api/v1/stripeapikey");
      //console.log(`stripe api Key data ${data.stripeApiKey}`)  //test krne k liye stripe api key huni cheya
      setStripeApiKey(data.stripeApiKey);
      }catch(error){
        console.log("Unauthorized Error", error)
      }
      
      
    };
    fetchStripeApiKey();
  }, []);
  //Inspect mein code nhi show hu ga
  // addEventListener("contextmenu", (e)=> e.preventDefault()) 
  
  return (
    <>
    
    <Router>
    <Header/> 
      {/* agr user login huta h to user ka data user Navbar mein show */}
       {isAuthenticated && <UserOptions user={user}/>}   

       {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route path="payment/process" element={<Payment/>} />
          </Routes>
        </Elements>
         )}

        <Routes>
           <Route path="/" element={<Home/>}/>
           {/* Product ---------------------------*/}
           <Route path="products" element={<Products />} /> 
           <Route path="/product/:id" element={<ProductDetails />} />
           <Route path="/products/:keyword?" element={<Products/>} />
           <Route path="/search" element={<Search/>} />

         {/* USER --------------------------*/}
           <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
           <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />}/>
           <Route path="/password/forget" element={<ForgetPassword/>}/>
           <Route path="/password/reset/:token" element={<ResetPassword/>}/>
           <Route path="/login" element={<LoginSignUp/>}/>
           <Route path="/account" element={<ProtectedRoute element={<Profile />} />}/>

             {/* Cart related ------------------*/}
           <Route path="/cart" element={<Cart/>}/>
            <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />}/>
           <Route path='/login/shipping' element={<ProtectedRoute element={<Shipping />} />}/>
           <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />}/>
           <Route path="/success" element={<ProtectedRoute element={<OrderSuccess />} />} />
           <Route path="/orders" element={<ProtectedRoute element={<MyOrders />} />}/>
           <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />}/>

           {/* No Logic =======*/}
           <Route path="/contact" element={<Contact/>}/>
           <Route path="/about" element={<About/>}/>

           {/* Admin Routes---------------------- */}
           <Route  path="/admin/dashboard" element={<ProtectedRoute isAdmin element={<DashBoard />} />}/>
           <Route  path="/admin/product" element={<ProtectedRoute isAdmin element={<NewProduct />} />}/>
           <Route  path="/admin/products" element={<ProtectedRoute isAdmin element={<ProductList />} />}/>
           <Route  path="/admin/product/:id"  element={<ProtectedRoute isAdmin element={<UpdateProduct />} />} />
           <Route  path="/admin/orders" element={<ProtectedRoute isAdmin element={<OrderList />} />}/>
           <Route  path="/admin/order/:id" element={<ProtectedRoute isAdmin element={<ProcessOrder />} />}/>
           <Route path="/admin/users" element={<ProtectedRoute isAdmin element={<UsersList />} />}/>
           <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin element={<UpdateUser />} />}/> 
           <Route path="/admin/reviews" element={<ProtectedRoute isAdmin element={<ProductReviews />} />}/>
           </Routes>
           
       <Footer/>
    </Router>
    </>
  )
}

export default App
