import {useEffect} from "react"
import './Dashboard.css'
import Sidebar from "./Sidebar";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllOrders } from "../../../actions/orderAction";
import { getAllUsers } from "../../../actions/userAction";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const DashBoard = ()=>{
     
  const {products} = useSelector((state)=> state.products)
  const {orders} =   useSelector((state)=> state.allOrders)
  const {users } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch()
  
  useEffect(() => {

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 4000],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };
    return (
        <div className="dashboard">
           <Sidebar/>
           <div className="dashboardContainer">
           <Typography component="h1">Dashboard</Typography>

<div className="dashboardSummary">
  <div>
    <p>
      Total Amount <br /> Rs. {totalAmount}
    </p>
  </div>
  <div className="dashboardSummaryBox2">
    <Link to="/admin/products">
      <p>Product</p>
      <p>{products && products.length}</p>
    </Link>
    <Link to="/admin/orders">
      <p>Orders</p>
      <p>{orders && orders.length}</p>
    </Link>
    <Link to="/admin/users">
      <p>Users</p>
      <p>{users && users.length}</p>
    </Link>
  </div>
  </div>
  <div className="lineChart">
          <Line data={lineState} />
    </div>

    <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

    </div>
        </div>
    )
}

export default DashBoard;