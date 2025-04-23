import  { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../../actions/orderAction";
import Loader from "../Loader/Loader";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Header/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders =()=>{
    const dispatch = useDispatch();
    const alert = useAlert()
    const {loading,error,orders } = useSelector((state)=>state.myOrders)
    const {user} =useSelector((state)=>state.user)
    const params = useParams()
    
     
    
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            // Access the value directly using params.value
            return params.value === "Delivered" ? "greenColor" : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            // Use params.row to access the row data
            return (
              <Link to={`/order/${params.row.id}`}>
                <LaunchIcon />
              </Link>
            );
          },
        },
      ];
      const rows=[];
      useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    },[dispatch,alert,error])
      
    //  console.log(orders, Array.isArray(orders), "order array or not"); // This will show if orders is an array
    
    if (Array.isArray(orders)) {
      orders.forEach((item) => {
          rows.push({
              itemsQty: item.orderItems.length,
              id: item._id,
              status: item.orderStatus,
              amount: item.totalPrice,
          });
      });
     }

    return <Fragment>
      {/* <MetaData title={`${user.name}-Orders`}/> */}
         {loading?
         (<Loader/>):(
            <div className="myOrdersPage">
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
               autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

            </div>
         )
         }

        
    </Fragment>
    
};

export default MyOrders