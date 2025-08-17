import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import NavBar from '../pages/NavBar';
const MainLayout = () => {
  return (
    <>
    <Outlet />
    </>
  );
};

export default MainLayout; 






