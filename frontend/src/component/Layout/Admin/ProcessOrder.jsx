import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Header/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import { getOrderDetails, clearErrors, updateOrder} from "../../../actions/orderAction";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Button from "@mui/material/Button";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import "./ProcessOrder.css";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    if (!status) {
      alert.error("Please select a status");
      return;
    }

    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id)); // Fetch order only if it's not loaded
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, alert, error, id, isUpdated, updateError, order]);

  useEffect(() => {
    if (order && order.orderStatus) {
      setStatus(order.orderStatus); // Default status set kar raha hai
    }
  }, [order]); // Jab bhi order change hoga, status update ho jayega

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : order ? (
            <div className="confirmOrderPage" style={{ display: order.orderStatus === "Delivered" ? "block" : "grid" }}>
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user ? order.user.name : "N/A"}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{order.shippingInfo ? order.shippingInfo.phoneNo : "N/A"}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo
                          ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                        {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                      </p>
                    </div>
                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice ? `₹${order.totalPrice}` : "N/A"}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p className={order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                        {order.orderStatus || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems ? (
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <span>
                            {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No items found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Processing Form */}
              <div style={{ display: order.orderStatus === "Delivered" ? "none" : "block" }}>
              <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="" disabled>Choose Category</option>
                       
                        <option value="Shipped">Shipped</option>
                  
                        <option value="Delivered">Delivered</option>
                      
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    style={{marginTop:"50px"}}
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <p>Order not found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
