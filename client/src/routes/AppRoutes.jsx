import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import NavBar from '../pages/NavBar.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import '../styles/globals.css';
import '../styles/globals.css';
import LoginPage from '../pages/Authentication/LoginPage.jsx';
import RegistertionPage from '../pages/Authentication/RegistertionPage.jsx';
import AdminPannel from '../pages/AdminPannel.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';
const AppRoutes = () => {
  return (
    <>
   
   <NavBar />

    <Routes>  
      <Route path="/" element={<Dashboard />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/productDetails' element={<ProductDetailsPage />} />

      <Route path='/register' element={<RegistertionPage />} />

      <Route path='/admin' element={<AdminPannel />} />

      
    </Routes>
    </>
  );
};

export default AppRoutes; 