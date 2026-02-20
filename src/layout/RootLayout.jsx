import { Outlet } from 'react-router-dom'
import Nav from '../component/Nav'
import Hero from '../component/Hero'
import HomeSlider from '../component/HomeSlider'

const RootLayout = () => {
  return (
    <div>
        
        <Nav/>
        <Hero/>
        
        <Outlet/>
    </div>
  )
}

export default RootLayout