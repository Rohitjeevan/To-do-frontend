import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
  
export const server = "https://nodejs-to-do-app-wh2f.onrender.com/api/v1";

export const Context = createContext({isAuthenticated:false});

const AppWrapper = ()=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading,setloading] = useState(false);
    const[user,setUser] = useState({});

    return(
    
   <Context.Provider
   value={{
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setloading,
    user,
    setUser,
   }}>
  <App />
  </Context.Provider>
      
    )
};
root.render(
  <React.StrictMode>
    <AppWrapper/> 
  </React.StrictMode>
)

// https://nodejs-to-do-app-wh2f.onrender.com

