import React, { Fragment} from "react";
import './ConfirmOrder.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import CheckoutStep from './CheckoutStep';



const ConfirmOrder = ()=>{
     const navigate = useNavigate()
     const {shippingInfo, cartItems} = useSelector((state)=> state.cart)
     const {user} = useSelector((state)=> state.user)
     const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
   
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };

         // loacal storage or session storage is same 
       // but there is one common best fact is if we have closed the tab data also removed in the storage
       // jis tab mein data process hu ga k session mein data hu ga agr again dosre tab mein
       // site open kare gy us k session mein data nhi hu ga backend yahi se data le ga
       sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
       navigate("/payment/process");
    } 
      

   
      return (
         <Fragment>
             <CheckoutStep activeStep={1}/>

             <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs{item.price} ={" "}
                      <b>Rs{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
         </Fragment>
    )
}

export default ConfirmOrder
