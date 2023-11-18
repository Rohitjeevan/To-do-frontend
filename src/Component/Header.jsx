import React, { useContext } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';
import { Context } from '../index.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server  } from '../index.js';
export const Header = () => {

  const {isAuthenticated,setIsAuthenticated,loading,setloading} =  useContext(Context);
   
  const logoutHandler = async()=>{
       setloading(true);
      try{
       const {data} =  await   axios.get(
         `${server}/users/logout`,{
             withCredentials:true,
         }
        )
        toast.success(data.message)
        setIsAuthenticated(false)
        setloading(false)
     }
      catch(error){
        toast.error(error.response.data.message);
        setIsAuthenticated(false)
        setloading(false);
        console.log(error);
      }
     } 
  

  return (
    <>
    <div className='header'>
       <span> To do App </span>
       <Link className='navbar' to={"/"}>Home </Link>
       <Link className='navbar' to={"/profile"} > Profile</Link>
      {
        isAuthenticated ? <button  disabled={loading} onClick={logoutHandler}> Logout</button> : <Link  className="navbar" to={"/login"} > Login</Link>
      }
   
    </div>
   
    </>
  )
}

 export default  Header;
