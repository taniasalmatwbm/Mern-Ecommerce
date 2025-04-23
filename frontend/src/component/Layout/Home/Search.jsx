import React,{useState, Fragment} from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
const Search = ()=>{
    const [keyword, setKeyword] =useState('')
    const navigate =useNavigate()
 
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate(`/products`)
        }
    };
   
    return (
         <Fragment>
             <form  onSubmit={searchSubmitHandler}>
                <input
                 type='text' 
                 placeholder='Search for dress...'
                 onChange={(e)=>setKeyword(e.target.value)}
                 className='searchBox'
                 />
                <input type='submit' value='search' className='button' style={{color: "white"}}/>
             </form>
         </Fragment>
    )
}

export default Search;