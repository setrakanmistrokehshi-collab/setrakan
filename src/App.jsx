import React from 'react'
import {Route,Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Nav from "./component/Nav"
import About from "./pages/About"
import Loginpage from "./pages/Loginpage"
import Registration from "../src/pages/Registration"
import UserList from "./pages/UserList"
import GetUser from "./pages/GetUser"
import EditUser from "./pages/EditUser"
import Hotel from "./pages/Hotel.jsx";
import Footer from "./component/Footer.jsx"


const App = () => {
  return (
    <>
   <Nav/>
   
     <Routes>

      <Route path ="/" element ={<HomePage/>}/>
      <Route path = "/About" element= {<About/>}/>
       <Route path ="/Login" element={<Loginpage />} />
        <Route path ="/register" element={<Registration />} />
        <Route path ="/User" element={<UserList />} />
         <Route path ="/GetUser/:id" element={<GetUser />} />
          <Route path ="/EditUser/edit/:id" element={<EditUser />} />
           <Route path ="/hotels" element={<Hotel/>} />
        
      </Routes> 
      <Footer/>
   
    </>
  )
}

export default App
