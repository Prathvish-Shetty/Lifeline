import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom.js'
import { logoutUser } from '../services/authService'
import profileImage from '../assets/profile.webp'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(authAtom);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Apply theme on load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle theme and save to localStorage
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuth({
        user: null,
        isAuthenticated: false
      });
      // localStorage.removeItem("auth");  // Clears only auth data
      navigate('/login');
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  }


  const getActiveClass = (path) => location.pathname === path ? 'btn btn-soft' : 'btn'

  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    {/* Mobile Menu (Hamburger + Dropdown) */}
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      
      <ul 
        tabIndex={0} 
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
      >
        <li><Link to="/" className={getActiveClass('/')}>Home</Link></li>
        {(auth.isAuthenticated && auth.user.role === "donor") && (
          <li><Link to="/donate" className={getActiveClass('/donate')}>Donate</Link></li>
        )}
        {(auth.isAuthenticated && auth.user.role === "hospital") && (
          <li><Link to="/request" className={getActiveClass('/request')}>Request</Link></li>
        )}
        {(auth.isAuthenticated && auth.user.role === "bloodBank") && (
          <li><Link to="/dashboard" className={getActiveClass('/dashboard')}>Dashboard</Link></li>
        )}
        <li><Link to="/about" className={getActiveClass('/about')}>About</Link></li>
        <li><Link to="/contact" className={getActiveClass('/contact')}>Contact</Link></li>
      </ul>
    </div>

    {/* Brand Name */}
    <Link to="/" className="btn btn-ghost text-xl">Lifeline</Link>
  </div>

  {/* Desktop Menu */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/" className={getActiveClass('/')}>Home</Link></li>
      {(auth.isAuthenticated && auth.user.role === "donor") && (
        <li><Link to="/donate" className={getActiveClass('/donate')}>Donate</Link></li>
      )}
      {(auth.isAuthenticated && auth.user.role === "hospital") && (
        <li><Link to="/request" className={getActiveClass('/request')}>Request</Link></li>
      )}
      {(auth.isAuthenticated && auth.user.role === "bloodBank") && (
        <li><Link to="/dashboard" className={getActiveClass('/dashboard')}>Dashboard</Link></li>
      )}
      <li><Link to="/about" className={getActiveClass('/about')}>About</Link></li>
      <li><Link to="/contact" className={getActiveClass('/contact')}>Contact</Link></li>
    </ul>
  </div>

  {/* Navbar End (Theme Switch + Profile/Logout) */}
  <div className="navbar-end flex gap-2">
    <label className="toggle text-base-content">
      <input
        type="checkbox"
        value="dark"
        onChange={handleThemeToggle}
        checked={theme === 'dark'}
        className="theme-controller"
      />

      <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </g>
      </svg>

      <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </g>
      </svg>
    </label>

    {!auth.isAuthenticated ? (
      <>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </>
    ) : (
      <div className='flex gap-4'>
        <button onClick={handleLogout} className="btn btn-soft">Logout</button>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img
              src={profileImage}
              alt='profile'
              onClick={() => { navigate("/profile") }}
              className='cursor-pointer'
            />
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  )
}

export default Navbar