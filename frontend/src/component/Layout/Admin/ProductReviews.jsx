import React, { Fragment, useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector,useDispatch } from "react-redux";
import './ProductReviews.css'
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../Header/MetaData";
import Sidebar from "./Sidebar";
import Button from "@material-ui/core/Button";
import { getAllReviews,deleteReviews,clearErrors } from "../../../actions/productAction";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";


const ProductReviews =()=>{
    const dispatch = useDispatch();
    // const {id}=useParams()
    const alert = useAlert();
    const navigate = useNavigate();
    const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review);

    const { error, reviews, loading } = useSelector(
    (state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {

    dispatch(deleteReviews(reviewId, productId));
        };

    const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
    };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, productId,navigate]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) =>
        params.row.rating >= 3 ? "greenColor" : "redColor",
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <button
            className="deleteButton"
            onClick={() => deleteReviewHandler(params.id)}
          >
            <DeleteIcon />
          </button>
        </Fragment>
      ),
    },
  ];

  const rows = reviews?.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  })) || [];
    return (
        <Fragment>
              <MetaData title={`ALL REVIEWS - Admin`} />

             <div className="dashboard">
             <Sidebar />
             <div className="productReviewsContainer">
              <form
               className="productReviewsForm"
               onSubmit={productReviewsSubmitHandler}
              >
             <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

             <div>
              <Star />
             <input
              type="text"
              placeholder="Product Id"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              />
             </div>

            <Button
             id="createProductBtn"
             type="submit"
             disabled={loading || productId === ""
              //  loading ? true : false || productId === "" ? true : false
             }
             >
                 Search
              </Button>
    </form>

            {reviews && reviews.length > 0 ? (
             <DataGrid
              rows={rows}
             columns={columns}
             pageSize={10}
             disableSelectionOnClick
              className="productListTable"
             autoHeight
            />
              ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
     </div>
        </Fragment>
    )
}

export default ProductReviews