import { Fragment , useEffect} from "react";
import "./ProductList.css"
import { Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Header/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import Button from "@material-ui/core/Button"; // Correct Import for Button
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAdminProduct, deleteProduct, clearErrors} from "../../../actions/productAction";
import Sidebar from "./Sidebar";

const ProductList =()=>{
    const dispatch = useDispatch();
    const alert = useAlert()
    const navigate = useNavigate()
    const { error, products } = useSelector((state) => state.products);
  
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.product);

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
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
          alert.success("Product Deleted Successfully");
          navigate("/admin/products");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }
    
        dispatch(getAdminProduct());
      }, [dispatch, alert, error, navigate, isDeleted, deleteError]);

      const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
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
            return (
              <Fragment>
                <Link to={`/admin/product/${params.row.id}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() => deleteProductHandler(params.row.id)}
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows = [];

      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
          });
        });
    

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList