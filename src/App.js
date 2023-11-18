import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Home  } from "./pages/Home";
import Header from "./Component/Header";
import { Profile } from "./Component/Profile";
import Login from "./Component/Login";
import { Register } from "./Component/Register";
import { Toaster } from 'react-hot-toast';
import { useEffect,useContext } from "react";
import axios from "axios";
import { Context,server } from "./index";
function App() {

  const{ setIsAuthenticated,setUser,setloading} = useContext(Context);

   useEffect(()=>{
    setloading(true)
    axios.get(`${server}/users/my`,{
      withCredentials:true,
    }).then(res =>{
         
        setUser(res.data.user)
        setIsAuthenticated(true);
        setloading(false)
       console.log(res.data.user)
  
      
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setloading(false)
    })
  
   },[]);

  return (
    <Router>

      <Header/> 

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
       
      </Routes>

      <Toaster/>
    </Router>
  );
}

export default App;
