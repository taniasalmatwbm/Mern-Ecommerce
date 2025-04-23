import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

// import {Rating} from "@material-ui/lab"  //updated
import "./Home.css"

const ProductCard = ({product}) => {
  const options={
    value: product.ratings,
    readOnly: true,
    precision:0.5,

  }
  return(
  
    <Link className="productCard" to={`/product/${product._id}`}>
    {/* <img src={product.images[0].url} alt={product.name} 
     style={{width: "100%"}}/>   error is coming backens mein image ja raha frontend pr direct nhi le rha */} 
     <img 
  src={product.images?.[0]?.url || "/default-product.jpg"} 
  alt={product.name}  
  style={{ width: "100%" }} 
/> 
    <p style={{color:"blue"}}>{product.name}</p>
    <div className="">
      <span><Rating {...options} readOnly/></span>
        {" "}
        <span className="productCardSpan">({product.numOfReviews}Reviews)</span>
    </div>
    <span>{`Rs: ${product.price}`}</span>
    </Link>
  
  )
};

export default ProductCard;
