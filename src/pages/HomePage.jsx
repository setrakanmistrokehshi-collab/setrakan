import React from 'react' 
import  Hero from "../component/Hero" 
import Home from "../component/Home"
import HomeSlider from '../component/HomeSlider'
import Services from './Services'
const HomePage = () => {
  return (
    <>

    <Hero/>
    <HomeSlider />
    <Home/> 
    <Services/> 
    </>
  )
}

export default HomePage
