import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store.js";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from "./App.jsx";
import "./index.css";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "10px",
  transition: transitions.SCALE,
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <AlertProvider template={AlertTemplate} {...options}>  
      <App />
    </AlertProvider>  
  </Provider>  
);












// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import  store  from './store.js'
// import { Provider as AlertProvider, positions, transitions } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
// import App from './App.jsx';
// import './index.css'



// const options = {
//   position: positions.TOP_RIGHT,
//   timeout: 5000,
//   offset: "10px",
//   transition: transitions.SCALE,
// };

// // console.log(`this aou app store ${store}`)

// createRoot(document.getElementById('root')).render(
  
//   <Provider store={store}>
//     {/* Alert Messages k liye */}
//     <AlertProvider template={AlertTemplate}  {...options}>
//      <App />
//     </AlertProvider>
  
//   </Provider>
   
// )   