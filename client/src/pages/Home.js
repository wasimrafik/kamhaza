import React from 'react';
import { Card } from 'primereact/card';
import CommonButton from '../components/CommonButton';

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Welcome" className="shadow-lg">
        <p className="mb-4">
          Welcome to our React application built with Vite, PrimeReact, and Tailwind CSS.
        </p>
        <CommonButton 
          label="Learn More" 
          icon="pi pi-info-circle"
          className="mt-4"
        />
      </Card>
      
      <Card title="Features" className="shadow-lg">
        <ul className="list-disc pl-6 space-y-2">
          <li>Modern React with Vite</li>
          <li>PrimeReact Components</li>
          <li>Tailwind CSS Styling</li>
          <li>Redux State Management</li>
          <li>React Router Navigation</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home; 