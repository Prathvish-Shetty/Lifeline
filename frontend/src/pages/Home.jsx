import React from 'react'
import home from '../assets/home.avif'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Lifeline</h1>
          <p className="mb-5 text-lg">
            Lifeline is your all-in-one platform for managing the blood donation ecosystem.  
            Whether you're a <span className="font-bold">donor</span>, <span className="font-bold">hospital</span>, or <span className="font-bold">blood bank</span>, we've got you covered.
          </p>
          <p className="mb-5 text-lg">
            Save lives with streamlined donations, quick requests, and efficient blood bank management — all in one place.
          </p>
          <Link to="/register">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
