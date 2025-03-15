import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function Layout() {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  )
}

export default Layout