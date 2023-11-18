import React, { useContext } from 'react'
import { Context } from '../index'
import { Loader } from './Loader';

export const Profile = () => {

  const{ loading,user,isAuthenticated}  = useContext(Context);
  return (
    <>
      { loading ? <Loader/> :
        <div>
        <h1>{user?.name }</h1>
        <h1> {user?.email}</h1>
        </div>
      }
        
       
     

    </>
  )
}

