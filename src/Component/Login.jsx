import React, { useContext,useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context } from '../index';
import toast from 'react-hot-toast';
import { server } from '../index';
import axios from 'axios';

import "./Login.css"
const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
const {isAuthenticated,setIsAuthenticated,loading,setloading} =  useContext(Context);
  if(isAuthenticated){
    return <Navigate to={"/"}/> 
   }

   const submitHandler = async(e)=>{
    e.preventDefault();
       setloading(true)
      try{
       const {data} =  await   axios.post(
         `${server}/users/login`,{
             email,password
         },{
             headers:{
                 "Content-Type":"application/json"
             },
             withCredentials:true,
         }
        )
        toast.success(data.message)
        setIsAuthenticated(true)
        setloading(false)
     }
      catch(error){
        toast.error(error.response.data.message);
        setIsAuthenticated(false)
        setloading(false)
        console.log(error);
      }
     } 
  return (
    <>
        <div className='loginform'>
            <section>
                <form onSubmit={submitHandler}>
                <input 
                    type='email'
                    placeholder='Email' 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required />
                    <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)} 
                    required
                    />
                     <button disabled={loading} type='submit'> Login </button>
                     <Link className='register' to={"/register"} > Register  </Link> 
                </form>
            </section>
        </div>
    </>
  )
}

export default Login