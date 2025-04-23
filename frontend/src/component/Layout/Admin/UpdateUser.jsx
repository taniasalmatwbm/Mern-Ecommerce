import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "@material-ui/core/Button"; // Correct Import for Button
import MetaData from "../Header/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Sidebar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import { getUserDetails, updateUser, clearErrors } from "../../../actions/userAction";
import Loader from "../Loader/Loader";

const UpdateUser = ( ) => {
  const {id} = useParams()
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = id;

  //useEffect 1-----
  // useEffect(() => {
  //   if (user && user._id !== id) {
  //     dispatch(getUserDetails(id));
  //   }
  // }, [dispatch, id, user]);

  useEffect(() => {
    // form ki initial state
    // form mein user ki detail ane se pahle form ki current situation handle ki ja rehi h 
    // !user  empty hu ya undefined aye ya form  k state mein data ane se pahle user._id !== id  
    // database ki _id aur user k param se li gai id unmatch
    //  hu agr dono mein se koi ak b true h to form mein data dispatch hu
   // userDetails se user mein data ane se pahle id match huni cheya ya userak empty array huna cheya
  if (!user || user._id !== id) {
    dispatch(getUserDetails(id));
  }
}, [dispatch, id, user]);

  //useEffect 2-----
  
// Issue: The second useEffect updates the state before
//  user is fully fetched. If user is undefined initially, it might not update correctly.
//  Fix: Only update the state when user is fetched.
  useEffect(() => {
    // form ki sari field k state mein data ane se pahle user mein data huna cheya
    // aur id match huni cheya 
    if (user && user._id === id) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
    }
  }, [user, id]);
  


// useEffect--3
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  
    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ 
        type: UPDATE_USER_RESET 
      });
    }
  }, [dispatch, alert, error, isUpdated, updateError, user,id ]);
  

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
  
    if (!role) {
      alert.error("Please select a role!");
      return;
    }
  
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
  
    // console.log("Updating user ID:", userId);
    // console.log("Form Data:", name, email, role);
    dispatch(updateUser(userId, myForm));

// const updatedUserData = { name, email, role };
// dispatch(updateUser(id, updatedUserData));

  };
  

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select 
                  value={role || ""} 
                   onChange={(e) => setRole(e.target.value)}
                  >
                 <option value="">Choose Role</option>
                 <option value="admin">Admin</option>
                 <option value="user">User</option>
                 </select>

                {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select> */}
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={updateLoading || !role}
                // disabled={updateLoading || role === ""}

                // disabled={
                //   updateLoading ? true : false || role === "" ? true : false
                // }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser