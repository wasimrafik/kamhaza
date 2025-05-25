import React from 'react';
import { Card } from 'primereact/card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-blue-50">
          <div className="text-center">
            <i className="pi pi-users text-4xl text-blue-500 mb-3"></i>
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-2xl font-bold text-blue-600">1,234</p>
          </div>
        </Card>
        
        <Card className="shadow-lg bg-green-50">
          <div className="text-center">
            <i className="pi pi-chart-line text-4xl text-green-500 mb-3"></i>
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-2xl font-bold text-green-600">$45,678</p>
          </div>
        </Card>
        
        <Card className="shadow-lg bg-purple-50">
          <div className="text-center">
            <i className="pi pi-check-circle text-4xl text-purple-500 mb-3"></i>
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p className="text-2xl font-bold text-purple-600">890</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 