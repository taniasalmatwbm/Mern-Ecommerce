import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element: Component, isAdmin = false }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  if (loading) return null; // Or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return Component;
};

export default ProtectedRoute;






























// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Route } from "react-router-dom";

// const ProtectedRoute =({ isAdmin, component: Component, ...rest})=>{
//         const {loading, isAuthenticated, user} = useSelector((state)=> state.user)
//     return (
//         <Fragment>
//               {loading === false && (
//                 <Route
//                   {...rest}
//                   render={(props)=>{
//                     if(isAuthenticated){
//                         return <Redirect to='/login'/>
//                     }

//                     if(isAdmin === true && user.role !== "admin"){
//                       return <Redirect to='/login'/>
//                     }
//                     return <Component {...props}/>
//                   }}
//                 /> 
//               )}
//         </Fragment>
//     )
// }

// export default ProtectedRoute;