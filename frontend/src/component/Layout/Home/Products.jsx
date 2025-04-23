import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from "../../../actions/productAction";
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
import './Products.css';
import { useAlert } from "react-alert";
import { useParams } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MetaData from '../Header/MetaData';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productCount,
    filteredProductsCount
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Pagination ka page number nahi bhejna
    dispatch(getProduct(keyword, price, category, ratings));
  }, [dispatch, keyword, price, category, ratings, alert, error]);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <Fragment>
      {loading || !products ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS---ECOMMERCE" />
          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            ) : (
              <div className="noProductsFound">
                <p>No products found matching your criteria</p>
              </div>
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Category</Typography>
            <ul className='categoryBox'>
              {categories.map((cat) => (
                <li
                  className='category-link'
                  key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby='continuous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          <h2 style={{ textAlign: "center" }}>
            Total PRODUCTS: {filteredProductsCount || productCount}
          </h2>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;




// import React, { Fragment, useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { clearErrors, getProduct } from "../../../actions/productAction";
// import ProductCard from './ProductCard';
// import Loader from '../Loader/Loader';
// import './Products.css'
// import { useAlert } from "react-alert";
// import { useParams } from 'react-router-dom';
// import Pagination from 'react-js-pagination'
// import Slider from '@material-ui/core/Slider'
// import  Typography  from '@material-ui/core/Typography';
// import MetaData from '../Header/MetaData';

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

// const Products = ()=>{
//   const {keyword} = useParams()
//    const dispatch = useDispatch()
//    const alert = useAlert()
//    const [currentPage, setCurrentPage] =useState(1);
//    const [price, setPrice] = useState([0, 25000]);
//    const [category, setCategory] = useState("")
//    const [ratings, setRatings] = useState([0])
   

//     const {products, 
//            loading,
//            error,
//            productCount, 
//            resultPerPage,
//            filteredProductsCount
//           } =useSelector((state)=>state.products);
//            console.log(`Products Data:, ${products}`);
//   //  console.log("productCount, filteredProductsCount", productCount, filteredProductsCount)
//     useEffect(()=>{
//         if (error) {
//            alert.error(error); // or use a proper notification system
//            dispatch(clearErrors());
//           }

//       dispatch(getProduct(keyword, currentPage, price, category, ratings))
//       // console.log("Products Data:", products);
//     },[dispatch, keyword, currentPage, price, category, ratings, alert, error])

     
//     const setCurrentPageNo = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };
    
//    const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };

//   // let count = filteredProductsCount;
//     return (

//         <Fragment>{
//           loading || !products ? (<Loader/>): (
//             <Fragment>
//               <MetaData title="PRODUCTS---ECOMMERCE"/>
//                   <h2 className='productsHeading'>Products</h2>
//                   <div className='products'>
//   {products && products.length > 0 ? (
//     products.map((product) => (
//       <ProductCard product={product} key={product._id}/>
//     ))
//   ) : (
//     <div className="noProductsFound">
//       <p>No products found matching your criteria</p>
//     </div>
//   )}
// </div>

               
//             <div className="filterBox">
//               <Typography>Price</Typography>
//                  <Slider
//                      value={price}
//                      onChange={priceHandler}
//                      valueLabelDisplay="auto"
//                      aria-labelledby="range-slider"
//                      min={0}
//                      max={25000}
//                  />
//                <Typography>Category</Typography>
//                   <ul className='categoryBox'>
//                      {
//                      categories.map((category)=>(
//                       <li
//                       className='category-link'
//                       key={category}
//                       onClick={()=>setCategory(category)}
//                       >
//                       {category}  
//                       </li>
//                      ))
//                      }
//                   </ul>

//                   <fieldset>
//                      <Typography component="legend">Ratings Above</Typography>
//                      <Slider
//                      value={ratings}
//                     onChange={(e,newRating) => setRatings(newRating)}
//                      aria-labelledby='continuous-slider'
//                      valueLabelDisplay='auto'
//                      min={0}
//                      max={5}
                     
//                      />
//                   </fieldset>
//             </div>
//             <h2 style={{ textAlign: "center" }}>Total PRODUCT {productCount}</h2>
            
//              {resultPerPage < productCount && (
//   <Pagination
//     activePage={currentPage}
//     itemsCountPerPage={resultPerPage || 10}
//     totalItemsCount={filteredProductsCount !== undefined ? filteredProductsCount : productCount}
//     onChange={setCurrentPageNo}
//     nextPageText="Next"
//     prevPageText="Prev"
//     firstPageText="1st"
//     lastPageText="Last"
//     itemClass="page-item"
//     linkClass="page-link"
//     activeClass="pageItemActive"
//     activeLinkClass="pageLinkActive"
//   />
// )}

//                  {/* <div className='paginationBox'>
//                 {resultPerPage < productCount && (
//   <Pagination
//     activePage={currentPage}
//     itemsCountPerPage={resultPerPage || 10}
//     totalItemsCount={filteredProductsCount !== undefined ? filteredProductsCount : productCount}
//     onChange={setCurrentPageNo}
//     nextPageText="Next"
//     prevPageText="Prev"
//     firstPageText="1st"
//     lastPageText="Last"
//     itemClass="page-item"
//     linkClass="page-link"
//     activeClass="pageItemActive"
//     activeLinkClass="pageLinkActive"
//   />
// )}
//                 </div>  */}
//                  {/* <Pagination
//               activePage={currentPage}
//               itemsCountPerPage={resultPerPage || 10} // Default to 10 if undefined
//               //totalItemsCount={50}
//               // totalItemsCount={filteredProductsCount !== undefined ? filteredProductsCount : productCount}
//               onChange={setCurrentPageNo}
//               nextPageText="Next"
//               prevPageText="Prev"
//               firstPageText="1st"
//               lastPageText="Last"
//               itemClass="page-item"
//               linkClass="page-link"
//               activeClass="pageItemActive"
//               activeLinkClass="pageLinkActive"
//             /> 
               
//              */}
//                 </Fragment>
//                 )
//             }
//         </Fragment>
//     )
// }

// export default Products