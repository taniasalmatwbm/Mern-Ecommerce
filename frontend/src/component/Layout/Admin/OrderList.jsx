import { Fragment, useEffect } from "react";
import "./ProductList.css";
import Button from "@mui/material/Button"; // Correct Import for Button
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../Header/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar";
import { getAllOrders, deleteOrder, clearErrors } from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    alert.success("An Order has been deleted successfully");
      dispatch(deleteOrder(id));
    
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
      
    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      dispatch({ type: DELETE_ORDER_RESET });
      navigate("/admin/orders");
    }
    
    // if (isDeleted) {
    //   alert.success("Order Deleted Successfully");
    //   navigate("/admin/orders");
    //   dispatch({ type: DELETE_ORDER_RESET });
    // }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, navigate, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.4,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
      
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.4,
    },
    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button  
            type="button"
            variant="contained"
            color="secondary"
            >
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>

            </Button>
            
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => deleteOrderHandler(params.row.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows =
    orders?.map((order) => ({
      id: order._id,
      itemsQty: order.orderItems.length,
      amount: order.totalPrice,
      status: order.orderStatus,
    })) || [];

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

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
  );
};

export default OrderList;
