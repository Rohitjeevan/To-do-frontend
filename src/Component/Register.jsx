import React, { useContext, useState } from 'react'
import { Context } from '../index.js';
import axios from "axios";
import { server } from '../index.js';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


export const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
     

const {isAuthenticated,setIsAuthenticated,loading,setloading} =  useContext(Context);


   if(isAuthenticated){
    return <Navigate to={"/"}/> 
   }
    const submitHandler = async(e)=>{
       e.preventDefault();
         setloading(true);
         try{
          const {data} =  await   axios.post(
            `${server}/users/new`,{
                name,email,password
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
            <section>
                <form onSubmit={submitHandler}>
                    <input 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    type='text'
                     placeholder='Name'
                     required  />

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

                     <button disabled={loading} type='submit'> Register </button>
                     
                </form>
            </section>
       
    </>
  )
}
