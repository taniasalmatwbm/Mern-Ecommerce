import React, { Fragment, useEffect, useCallback } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import MetaData from "../Header/MetaData";
import Button from "@material-ui/core/Button"; // Correct Import for Button
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";




const UsersList =()=>{
    const dispatch = useDispatch();
    const alert = useAlert()
    const navigate = useNavigate()
    const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
//This function is re-created on every render, which can affect performance.
  // const deleteUserHandler = (id) => {
  //   dispatch(deleteUser(id));
  // };
 
  

const deleteUserHandler = (id) => {
  dispatch(deleteUser(id));
};

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
  //This resets isDeleted even when message is empty.
    // if (isDeleted) {
    //   alert.success(message);
    //   navigate("/admin/users");
    //   dispatch({ type: DELETE_USER_RESET });
    // }
    if (isDeleted && message) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    //optimization
    // Sirf tabhi getAllUsers() call ho jab users ka data available na ho.
    // Agar users mein pehle se hi data hai, to dobara fetch karne ki zaroorat nahi.

    if (!users || users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, alert, error, deleteError, isDeleted, message, navigate]);
  //const getRoleClass = (role) => (role === "admin" ? "greenColor" : "redColor");

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.7 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.4 },
    
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => (params.row.role === "admin" ? "greenColor" : "redColor"),
      // cellClassName: (params) => getRoleClass(params.row.role),
    },
        {
          field: "actions",
          headerName: "Actions",
          minWidth: 150,
          flex: 0.3,
          sortable: false,
          if(){},
          renderCell: (params) => (
            
            <Fragment>
              <Button style={{ backgroundColor: "tomato" }}>
              <Link to={`/admin/user/${params.row.id}`}>
                <EditIcon />
              </Link>
              </Button>
             
              <Button style={{ backgroundColor: "tomato" }}
               onClick={() => deleteUserHandler(params.row.id)}>
                <DeleteIcon />
              </Button>
            </Fragment>
          ),
        },
      ];
    
      // You correctly used users || [] to prevent .map() 
      // from running on undefined. No change needed here.
      //logic optimization
      // Haan, tumhari soch bilkul theek hai! (users || []) ka logic ye ensure kar raha hai ke agar users undefined ya null ho, to map error na de 
      // aur bas ek khali array return ho jaye.Iska matlab:
      // Agar users mein data hai, to map uska ek naya array bana dega rows ke liye.
      // Agar users null ya undefined hai, to map chalega hi nahi, aur rows ek empty array rahega.
      const rows = (users || []).map((user) => ({
        id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      }));
      
  return (
    <Fragment>
    <MetaData title={`ALL USERS - Admin`} />

    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL USERS</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  )
}

export default UsersList