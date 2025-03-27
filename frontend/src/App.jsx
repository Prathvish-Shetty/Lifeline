import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Donate from './pages/Donate.jsx'
import Request from './pages/Request.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from './store/authAtom.js';
import { getUserProfile } from './services/dataService.js'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


function App() {
  const setAuth = useSetRecoilState(authAtom);
  useEffect(() => {
    const restoreAuthState = async () => {
      try {
        // const storedAuth = localStorage.getItem("auth");
        // if (storedAuth) {
        //   setAuth(JSON.parse(storedAuth));
        //   return;
        // }
        const profile = await getUserProfile();
        const authData = { user: profile.user, isAuthenticated: true };
        // console.log(profile.user)
        setAuth(authData);
        // localStorage.setItem("auth", JSON.stringify(authData));
      } catch (error) {
        // console.error("Failed to restore session:", error);
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
          <Route element={<ProtectedRoute/>}>
            <Route path='/donate' element={<Donate />} />
            <Route path='/request' element={<Request />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
