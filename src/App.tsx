import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <div className=' h-[100vh]'>

        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
