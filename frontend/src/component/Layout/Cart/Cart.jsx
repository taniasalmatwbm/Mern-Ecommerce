import React, { Fragment } from "react";
import './Cart.css'
import CartItemCard from './CartItemCard'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, Link} from "react-router-dom";
import { addItemToCart, removeItemsFromCart } from "../../../actions/cartAction";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Typography } from "@material-ui/core";

const Cart = ()=>{
    // remember redux mein cart mein data aina cheya phir agy cart continue kare gy
    const dispatch = useDispatch()
    // const { id } = useParams()
    const navigate = useNavigate()
    const {cartItems} = useSelector((state)=>state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemToCart(id, newQty));
      }
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemToCart(id, newQty));
      }

      const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
      }
    
      const checkoutHandler = () => {
       navigate("/login?redirect=shipping");
      }

    return (
        <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" 
                    value={item.quantity} 
                    readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`Rs:${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Total Payment</p>
                <p>{`Rs:${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
      
    )
}

export default Cart