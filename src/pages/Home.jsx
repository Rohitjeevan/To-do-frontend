import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Context, server } from '../index';
import { TodoItem } from '../Component/TodoItem';
import { Navigate } from 'react-router-dom';

export const Home = () => {


  const [title,settitle] = useState("");
  const[description,setDescription] = useState("");
  const [loading,setloading] = useState(false);
  const [tasks,setTask] = useState([]);
  const {isAuthenticated} = useContext(Context)
   


  const submitHandler = async(e)=>{
    e.preventDefault();
    setloading(true)
      try{
        const {data} = await axios.post(`${server}/task/newtask`,{
             title,
             description
        },{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json",
          },
      } )

      settitle("");
      setDescription("");
      toast.success(data.message);
      setloading(false);
      }
      catch(error){
        toast.error(error.response.data.message);
        setloading(false)
      }
  }


  useEffect(()=>{
         axios.get(`${server}/task/all`,{
          withCredentials:true,
         })
         .then((res)=>{
          setTask(res.data.task)
         //s console.log(res.data.task);
         })
      .catch((e) =>{
        toast.error(e.response.data.message);
      })
  })

   const updateHandler = async (id)=>{
        try{
          const {data} = await axios.put(
            `${server}/task/${id}`,{},{
              withCredentials:true
            }
            );

            toast.success(data.message);
        }
        catch(error){
           toast.error(error.response.data.message);
        }

   }



   const deleteHandler = async(id)=>{
    try{
      const {data} = await axios.delete(
        `${server}/task/${id}`,{
          withCredentials:true
        }
        );

        toast.success(data.message);
    }
    catch(error){
       toast.error(error.response.data.message);
    }
   }

    
  if(!isAuthenticated){
    return <Navigate to= {"/login"}/>
 }

  return (
   <>
    <div  >
            <section className='loginform'>
                <form onSubmit={submitHandler}>
                <input 
                    type='txt'
                    placeholder='title' 
                    value={title}
                    onChange={(e)=> settitle(e.target.value)}
                    required />
                    
                    <input
                    type='txt'
                    placeholder='Description'
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)} 
                    required
                    />
                     <button disabled={loading} type='submit'> Add task </button>
                    
                </form>
            </section>

                <div>

                  {tasks.map((i)=>(
                     <TodoItem 
                     title={i.title}
                     description={i.description}
                     isCompleted={i.isCompleted}
                     updateHandler={updateHandler}
                     deleteHandler={deleteHandler}
                     id = {i._id}
                     key={i._id}
                     />
                    ))}

                </div>
    
     </div>
   </>
  )
}
