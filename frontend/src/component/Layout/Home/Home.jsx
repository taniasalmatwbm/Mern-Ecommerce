import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import "./Home.css";
import Loader from "../Loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    products = [], // default to empty array to avoid map error
    loading,
    error,
    productCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct()); // load all products
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="banner">
            <div className="banner-text">
              <h1>Welcome to OUR ECommerce</h1>
              {/* <h4>FIND AMAZING PRODUCTS BELOW</h4>
              <a href="#container">
                <button className="btn">
                  Scroll <CgMouse />
                </button>
              </a> */}
            </div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No products available</p>
            )}
          </div>

          <h2 style={{ textAlign: "center" }}>
            Total Products: {productCount || 0}
          </h2>
        </div>
      )}
    </>
  );
};

export default Home;










// import React, { useEffect, useState } from "react";
// import { CgMouse } from "react-icons/cg";
// import ProductCard from "./ProductCard";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../../actions/productAction";
//  //import Pagination from "react-js-pagination";
// import { useAlert } from "react-alert";
// import "./Home.css";
// import Loader from "../Loader/Loader";

// const Home = () => {
//   const alert = useAlert();
//   const dispatch = useDispatch();
//  //const [currentPage, setCurrentPage] = useState(1);

//   const {
//     products,
//     loading,
//     error,
//     productCount,
//     //  resultPerPage,
//     //  filteredProductsCount,
//   } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(getProduct());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//        dispatch(clearErrors());
//       //console.error("Error fetching products:", error);
//     }
//   }, [error, alert]);

//   // const setCurrentPageNo = (pageNumber) => {
//   //   setCurrentPage(pageNumber);
//   // };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div>
//           <div className="banner">
//             <div className="banner-text">
//               <h1>Welcome to eCommerce</h1>
//               <h4>FIND AMAZING PRODUCTS BELOW</h4>
//               <a href="#container">
//                 <button className="btn">
//                   Scroll <CgMouse />
//                 </button>
//               </a>
//             </div>
//           </div>

//           <h2 className="homeHeading">Featured Products</h2>

//           <div className="container" id="container">
//             {products && products.map((product) => (
//                 <ProductCard product={product} key={product._id} />
//               ))
//            }
//           </div>

//           <h2 style={{ textAlign: "center" }}>Total Products: {productCount}</h2>

//           {/* <Pagination
//               activePage={currentPage}
//               itemsCountPerPage={resultPerPage || 10} // Default to 10 if undefined
//               // totalItemsCount={50}
//               totalItemsCount={filteredProductsCount !== undefined ? filteredProductsCount : productCount}
//               onChange={setCurrentPageNo}
//               nextPageText="Next"
//               prevPageText="Prev"
//               firstPageText="1st"
//               lastPageText="Last"
//               itemClass="page-item"
//               linkClass="page-link"
//               activeClass="pageItemActive"
//               activeLinkClass="pageLinkActive"
//             />  */}
               
            
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;
