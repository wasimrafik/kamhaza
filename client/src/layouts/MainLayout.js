import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          {/* Add your navigation items here */}
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 Your App Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 