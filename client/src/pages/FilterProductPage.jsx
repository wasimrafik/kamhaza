import React from 'react'

function FilterProductPage() {
  return (
    <>
                {/* <!-- Listings Page --> */}
                <div className="page hidden" id="listingsPage">
            <div className="container">
                <div className="listings-header">
                    <h1>All Listings</h1>
                    <div className="advanced-filters">
                        <button className="btn-secondary" id="toggleFilters">
                            <i className="fas fa-filter"></i> Filters
                        </button>
                    </div>
                </div>
                
                <div className="listings-content">
                    <div className="filters-sidebar" id="filtersSidebar">
                        <h3>Filters</h3>
                        <div className="filter-group">
                            <label>Category</label>
                            <select id="categoryFilter" className="form-control">
                                <option value="">All Categories</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Price Range</label>
                            <div className="price-inputs">
                                <input type="number" id="minPrice" placeholder="Min" className="form-control"/>
                                <input type="number" id="maxPrice" placeholder="Max" className="form-control"/>
                            </div>
                        </div>
                        <div className="filter-group">
                            <label>Location</label>
                            <select id="locationFilter" className="form-control">
                                <option value="">All Locations</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Date Posted</label>
                            <select id="dateFilter" className="form-control">
                                <option value="">Any time</option>
                                <option value="today">Today</option>
                                <option value="week">This week</option>
                                <option value="month">This month</option>
                            </select>
                        </div>
                        <button className="btn-primary btn-full-width" id="applyFilters">Apply Filters</button>
                        <button className="btn-secondary btn-full-width" id="clearFilters">Clear All</button>
                    </div>
                    
                    <div className="listings-results">
                        <div className="results-header">
                            <span className="results-count" id="resultsCount">0 results</span>
                            <div className="sort-controls">
                                <label>Sort by:</label>
                                <select id="sortSelect" className="form-control">
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="products-grid" id="listingsGrid"></div>
                        <div className="pagination" id="pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default FilterProductPage