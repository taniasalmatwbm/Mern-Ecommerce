import React, {Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../../actions/productAction";
 import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard"
 import Loader from "../Loader/Loader"
import {useParams} from "react-router-dom"
import MetaData from "../Header/MetaData";
import {addItemToCart} from '../../../actions/cartAction'
import {Dialog, DialogActions, DialogContent, DialogTitle, Button} from '@material-ui/core'
// import {Rating} from "@material-ui/lab" //updated
import { Rating } from "@mui/material";
import './ProductDetails.css'
import { NEW_REVIEW_RESET } from "../../../constants/productConstants";
import { lightGreen } from "@material-ui/core/colors";


const ProductDetails = () => {
  const {id} =useParams()
//yaha redux store mein sara data recieve hu aga prouct nhi mily gi
  const dispatch = useDispatch();
  const alert = useAlert();

  const {product, loading, error} = useSelector((state) => state.productDetails);
  const {success, error: reviewError } = useSelector((state)=> state.newReview)
  // console.log("New Review",newReview)
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Review Submit SuccessFully")
      dispatch({type: NEW_REVIEW_RESET})
    }


    dispatch(getProductDetails(id));
  
  }, [dispatch, id, error, alert, reviewError, success]);


  const options={
    value: product.ratings,
    readOnly: true,
    precision:0.5,

  }

 const [quantity, setQuantity] = useState(1);
 const [open, setOpen] = useState(false);
 const [rating, setRating] = useState(0);
 const [comment, setComment] = useState("")

 const submitReviewToggle= ()=>{
  
   open? setOpen(false) : setOpen(true);
 }

 const reviewSubmitHandler = ()=>{
  // Provides a way to easily construct a set of key/value pairs representing form fields
  //  and their values, which can then be easily sent using the XMLHttpRequest.send() method. 
  //  It uses the same format a form would use if the encoding type were set to "multipart/form-data".
  const myForm = new FormData()
  myForm.set("rating", rating);
  myForm.set("comment",comment);
  myForm.set("productId",id)
  dispatch(newReview(myForm))
  //submit hute hi dialog box chale jaye us k liye 
  setOpen(false);
 }

 const increaseQuantity =()=>{
  if(product.stock <= quantity) return;
// agr if wali condition true huti h to increase nhi chale ga khxh return nhi hu ga
// one by one compare kro dono ko pahle < se phir = se
    const qty = quantity +1;
    setQuantity(qty)
 }

 const decreaseQuantity =()=>{
  // state mein ak se kamm koi value nhi hu gi state mein 1 se kam minus nhi hu ga 
  // yani quantity state mein 1 huna cheya ya 1 sy bara huna cheya value 
  if(1 >= quantity) return;  
  const qty = quantity -1;
  setQuantity(qty)
}

const addToCartHandler = () =>{
  dispatch(addItemToCart(id, quantity));
  alert.success("added Item to cart")
}
  
  return ( 
    <Fragment> { loading ? (<Loader/>) :
       
      (<>
       <MetaData title={`${product.name}PRODUCTS---ECOMMERCE`}/>
      <div className="ProductDetails">
          <Carousel>
              {
                product.images && product.images.map((item, i)=>(
                   <img
                   className="CarouselImage"
                   key={i}
                   src={item.url}
                   alt={`${i} Slides`}
                   />
                ))
              }
          </Carousel>
        

         <div>
                   <div className="detailsBlock-1">
                      <h2>{product.name}</h2>
                      <p>Product # {product._id}</p>
                   </div>

                   <div className="detailsBlock-2">
                    <span><Rating {...options} readonly/></span>
                     
                     <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
                   </div>
                    
                 <div className="detailsBlock-3">
                   <h1>{`Rs ${product.price}`}</h1>
                   <div className="detailsBlock-3-1">
                     <div className="detailsBlock-3-1-1">
                       <button onClick={decreaseQuantity}>-</button>
                       <input readOnly  type="number"  value={quantity}/>
                       <button onClick={increaseQuantity}>+</button>
                     </div> {" "}
                     <button 
                    //  disabled={product.stock<1 ? true:false}  //unnessery
                     onClick={addToCartHandler}>
                      Add to Cart
                      </button>
                   </div>
                   <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "Instock"}
                  </b>
                </p>
                 </div>

                 <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle}  className="submitReview">
                Submit Review
              </button>
            </div>    
       </div>
       <h3 className="reviewsHeading"> Reviews</h3>
       <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
             {/* rating k liye */}
            <DialogContent className="submitDialog">
              <span>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              </span>
              
              {/* Text k liye */}
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

            </DialogContent>

            <DialogActions>
               <Button onClick={submitReviewToggle} color="secondary">
                 Cancel
               </Button>
               <Button onClick={reviewSubmitHandler} color="primary">
                 Submit
               </Button>
            </DialogActions>
          </Dialog>

       {product.reviews && product.reviews[0] ?
        <div className="reviews">
           {
           product.reviews.map((review, i)=>
             <ReviewCard review={review} key={i}/>)
           }
        </div>
       :
       <p className="noReviews">No Reviews Yet</p>}
       </>   
      )
      }
    </Fragment>
  
    
  )
}

export default ProductDetails;
