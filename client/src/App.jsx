// Libraries
import { Routes, Route, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Pages
import Home from './pages/Home';
import Settings from './pages/Settings';
import ShowProduct from './pages/ShowProduct';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import NotFound from './pages/404';
import Login from './pages/Login';

// Components
import SidebarNav from './components/SidebarNav';
import Header from './components/Header';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setName] = useState("");
  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <div className={`flex`}>
      {loggedIn && <SidebarNav setLoggedIn={setLoggedIn} username={username} />}
      <div className={`w-full`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} setName={setName} />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path="/Register" element={<Register setLoggedIn={setLoggedIn} setName={setName} />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Sell" element={<Sell username={username} />} />
            <Route path="/Buy" element={<Buy />} />
            <Route path="/Buy/:id" element={<ShowProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  )
}

export default App
