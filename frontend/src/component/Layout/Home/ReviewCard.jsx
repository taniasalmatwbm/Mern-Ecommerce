// import ReactStar from "react-rating-stars-component"
import profilePng from "../../../images/Profile.png"
import {Rating} from "@material-ui/lab"

const ReviewCard = ({review}) => {

  const options={
    value: review.rating,
    readOnly: true,
    precision:0.5,

  }
    // const options ={
    //     edit:false,
    //     color:"rgba(20,20,20,0.1)",
    //     activeColor:"#ffd700",
    //     size: 20,
    //     value: review.rating,
    //     isHalf:true,
    
    // }

  return(
    <div className="reviewCard">
    <img src={profilePng} alt="User" />
    <p>{review.name}</p>
    <Rating {...options} />
    <span className="reviewCardComment">{review.comment}</span>
  </div>
  
  )
};

export default ReviewCard;