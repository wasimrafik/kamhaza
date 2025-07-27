import React from 'react';
import './Dashboard.css';
import '../styles/globals.css';
import HomePage from './HomePage';
import Footer from './Footer';
import ProductDetailsPage from './ProductDetailsPage';
import FilterProductPage from './FilterProductPage';
const Dashboard = () => {
    return <>

        {/*  Main Content  */}
        <main className="main-content" id="mainContent">
            <HomePage />
            <ProductDetailsPage />
            <FilterProductPage />
        </main>

        <Footer />
    </>;
};

export default Dashboard;