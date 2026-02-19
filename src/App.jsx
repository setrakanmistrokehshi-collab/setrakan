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
import Product from "./pages/product.jsx";
import Footer from "./component/Footer.jsx"
import Services from "./pages/Services.jsx"

const App = () => {
  return (
    <>
       <Nav/>
   
     <Routes>

      <Route path ="/home" element ={<HomePage/>}/>
      <Route path = "/About" element= {<About/>}/>
       <Route path ="/login" element={<Loginpage />} />
       <Route path ="/Services" element={<Services />} />
      
        <Route path ="/register" element={<Registration />} />
        <Route path ="/users" element={<UserList />} />
         <Route path ="/getUsers/:id" element={<GetUser />} />
          <Route path ="/EditUser/edit/:id" element={<EditUser />} />
           <Route path ="/Product" element={<Product/>} />
        
      </Routes> 
      <Footer/>
   
    </>
  )
}

export default App
