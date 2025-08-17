import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const SearchSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    'All',
    'Motors',
    'Jobs',
    'Classifieds',
    'Property',
    'New Projects',
    'Community'
  ];

  return (
    <div className="relative search-section-bg h-[500px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-8 leading-tight">
          The best place to buy your house, sell your car or find a job in Dubai
        </h1>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="bg-white/20 inline-flex rounded-t-lg overflow-hidden mb-0">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex bg-white rounded-lg rounded-tl-none p-2 shadow-lg">
            <InputText
              placeholder="Search for anything..."
              className="search-input"
            />
            <Button
              label="Search"
              icon="pi pi-search"
              className="btn-primary ml-2"
              iconPos="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection; 