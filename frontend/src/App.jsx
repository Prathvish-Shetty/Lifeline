import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Donate from './pages/Donate.jsx'
import Request from './pages/Request.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from './store/authAtom';
import { getUserProfile } from './services/dataService.js'


function App() {
  const setAuth = useSetRecoilState(authAtom);
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const profile = await getUserProfile();
        console.log(profile.user)
        setAuth({ user: profile.user, isAuthenticated: true });
      } catch (error) {
        console.error("Failed to restore session:", error);
        setAuth({ user: null, isAuthenticated: false });
      }
    };

    restoreAuthState();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/donate' element={<Donate />} />
          <Route path='/request' element={<Request />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
