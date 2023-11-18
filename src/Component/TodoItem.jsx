import React from 'react'

export const TodoItem = ({title,description,isCompleted,updateHandler,deleteHandler,id}) => {
  return (
    <>
        <div>
            <div className='toItem'>
            <input type='checkbox' onChange={()=> updateHandler(id)} checked={isCompleted} /> 
            <span>{title} </span>
            {/* <p>{description} </p> */}
            
            
            <button onClick={()=> deleteHandler(id)}> delete </button>

            </div>
        </div>
    </>
  )
}
