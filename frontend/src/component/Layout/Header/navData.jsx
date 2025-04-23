// import { FaShoppingCart, FaSearch,  } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/about',
    text: 'about',
  },
  {
    id: 3,
    url: '/products',
    text: 'products',
  },
  {
    id: 4,
    url: '/contact',
    text: 'contact',
  }
  // {
  //   id: 5,
  //   url: '/profile',
  //   text: 'profile',
  // },
];

export const navIcons = [
  // {
  //   id: 1,
  //   url: '/cart',
  //   icon: <FaShoppingCart/>,
  // },
  // {
  //   id: 2,
  //   url: '/search',
  //   icon: <FaSearch />,
  // },
  {
    id: 1,
    url: '/login',
     icon:  <CgProfile style={{color: "darkslategray"}}/>
  }
  
];
