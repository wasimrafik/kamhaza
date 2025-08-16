import React, {useEffect,useRef, useState} from 'react'
import { mockProducts, mockCategories } from '../assets/Data/MockData.js';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [items, setItems] = useState([]);

     const [activeCategory, setActiveCategory] = useState('all');
    const [menuItems, setMenuItems] = useState([]);
    const menu = useRef(null);
    const navigate = useNavigate();


    const categoryFilters = {
        electronics: ['Mobile', 'Laptop', 'Camera'],
        vehicles: ['Cars', 'Motorcycles', 'Trucks'],
        fashion: ['Men', 'Women', 'Accessories'],
        'real-estate': ['Rent', 'Buy', 'Commercial'],
        'home-garden': ['Furniture', 'Decor', 'Gardening'],
        all: []
    };

      const categories = [
        { key: 'all', label: 'All Categories' },
        { key: 'electronics', label: 'Electronics' },
        { key: 'vehicles', label: 'Vehicles' },
        { key: 'real-estate', label: 'Real Estate' },
        { key: 'fashion', label: 'Fashion' },
        { key: 'home-garden', label: 'Home & Garden' },
    ];

      // Handle Subcategory Selection
    const handleSubcategorySelect = (categoryKey, subcategoryLabel) => {
        setActiveCategory(categoryKey); // highlight parent
        const urlCategory = categoryKey.toLowerCase();
        const urlSub = subcategoryLabel.toLowerCase().replace(/\s+/g, '-');
        navigate(`/category/${urlCategory}/${urlSub}`);
    };

    // Handle Category Button Click
    const handleCategoryClick = (categoryKey, event) => {
        const subcategories = categoryFilters[categoryKey] || [];
        const items = subcategories.map(sub => ({
            label: sub,
            command: () => handleSubcategorySelect(categoryKey, sub)
        }));

        setMenuItems(items);
        menu.current.toggle(event);
    };

    useEffect(() => {
      // Simulate API call to get featured products
      setFeaturedProducts(mockProducts.filter(product => product.featured));
    }, []);

    return (
        <>
              {/* <!-- Home Page -->  */}
    <div className="page" id="homePage">
       {/* <!-- Category Filter Bar -->  */}
        <div className="filter-bar">
            <div className="container">
                <div className="categories-nav">
                    <button className="category-btn active" data-category="all">All Categories</button>
                    <button className="category-btn" data-category="electronics">Electronics</button>
                    <button className="category-btn" data-category="vehicles">Vehicles</button>
                    <button className="category-btn" data-category="real-estate">Real Estate</button>
                    <button className="category-btn" data-category="fashion">Fashion</button>
                    <button className="category-btn" data-category="home-garden">Home & Garden</button>
                </div>
                <div className="subcategories" id="subcategories"></div>
            </div>

              {/* <div className="filter-bar">
           <div className="filter-bar">
            <div className="container">
                <div className="categories-nav">
                    {categories.map(cat => (
                        <button
                            key={cat.key}
                            className={`category-btn ${activeCategory === cat.key ? 'active' : ''}`}
                            onClick={(e) => handleCategoryClick(cat.key, e)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <Menu model={menuItems} popup ref={menu} />
            </div>
        </div>
              </div> */}
        </div>

        {/* <!-- Hero Section -->  */}
        <section className="hero">
            <div className="hero-content">
                <h1>Find Everything You Need</h1>
                <p>Buy and sell with confidence on ClassNameiFind</p>
                <button className="btn-primary btn-lg" id="postAdBtn">Post Free Ad</button>
            </div>
        </section>

      {/* <!-- Products Grid --> */}
        {/* <section className="products-section">
            <div className="container">
                <div className="section-header">
                    <h2>Latest Listings</h2>
                    <div className="view-controls">
                        <button className="view-btn active" data-view="grid"><i className="fas fa-th"></i></button>
                        <button className="view-btn" data-view="list"><i className="fas fa-list"></i></button>
                    </div>
                </div>
                <div className="products-grid" id="productsGrid"></div>
                <div className="load-more">
                    <button className="btn-secondary" id="loadMoreBtn">Load More</button>
                </div>
            </div>
        </section> */}

<section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Listings</h2>
            <a href="/listings" className="btn-outline">View All</a>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.images[0]} alt={product.title} />
                  <button className="wishlist-btn">
                    <i className="fa fa-heart"></i>
                  </button>
                  {product.featured && <span className="featured-badge">Featured</span>}
                </div>
                
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  <div className="product-meta">
                    <span className="location">
                      <i className="fa fa-map-marker"></i>
                      {product.location.area}, {product.location.city}
                    </span>
                    <span className="date">
                      {new Date(product.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* <div className="seller-info">
                    <img src={product.seller.avatar} alt={product.seller.name} className="seller-avatar" />
                    <div className="seller-details">
                      <span className="seller-name">{product.seller.name}</span>
                      <div className="seller-rating">
                        <span className="stars">★★★★★</span>
                        <span>({product.seller.totalReviews})</span>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div> 



      {/* Featured Products */}


      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How ClassiFind Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>Browse & Search</h3>
              <p>Find exactly what you're looking for with our powerful search and filters</p>
            </div>
            <div className="step">
              <div className="step-icon">💬</div>
              <h3>Connect & Chat</h3>
              <p>Message sellers directly through our secure chat system</p>
            </div>
            <div className="step">
              <div className="step-icon">🤝</div>
              <h3>Meet & Deal</h3>
              <p>Meet in person, inspect the item, and complete your purchase safely</p>
            </div>
          </div>
        </div>
      </section>
    
        </>
    );
};

export default HomePage;