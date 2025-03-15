import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/authAtom.js'
import { logoutUser } from '../services/authService'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [auth, setAuth] = useRecoilState(authAtom);

  const handleLogout = async () => {
    try {
      await logoutUser();  
      setAuth({
        user: null,
        isAuthenticated: false
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  }
  

  const getActiveClass = (path) => location.pathname === path ? 'btn btn-soft' : 'btn'

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">Lifeline</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={getActiveClass('/')}>Home</Link></li>
          {(auth.isAuthenticated && auth.user.role==="donor") && <li><Link to="/donate" className={getActiveClass('/donate')}>Donate</Link></li>}
          {(auth.isAuthenticated && auth.user.role==="hospital") && <li><Link to="/request" className={getActiveClass('/request')}>Request</Link></li>}
          <li><Link to="/about" className={getActiveClass('/about')}>About</Link></li>
          <li><Link to="/contact" className={getActiveClass('/contact')}>Contact</Link></li>
        </ul>
      </div>
      <div className="navbar-end flex gap-2">
        {/* {!true ? ( */}
        {!auth.isAuthenticated ? (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn btn-soft">Logout</button>
        )}
      </div>
    </div>
  )
}

export default Navbar