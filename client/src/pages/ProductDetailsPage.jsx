import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../assets/Data/MockData.js';

function ProductDetailsPage() {

//   const id  = 1;
//   const [product, setProduct] = useState('');
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [showContactModal, setShowContactModal] = useState(false);

//   useEffect(() => {
//     // Simulate API call
//     const foundProduct = mockProducts.find(p => p.id === parseInt(id));
//     setProduct(foundProduct);
//   }, [id]);

//   if (!product) {
//     return (
//       <div className="container">
//         <div className="loading-state">
//           <div className="spinner"></div>
//           <p>Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="product-detail-container">
//         {/* Breadcrumb */}
//         <nav className="breadcrumb">
//           <a href="/">Home</a> &gt; 
//           <a href="/listings">{product.category}</a> &gt;
//           <span>{product.title}</span>
//         </nav>

//         <div className="product-detail-grid">
//           {/* Image Gallery */}
//           <div className="product-gallery">
//             <div className="main-image">
//               <img 
//                 src={product.images[selectedImageIndex]} 
//                 alt={product.title}
//                 className="main-product-image"
//               />
//               {product.featured && <span className="featured-badge">Featured</span>}
//             </div>
            
//             {product.images.length > 1 && (
//               <div className="thumbnail-gallery">
//                 {product.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`${product.title} ${index + 1}`}
//                     className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
//                     onClick={() => setSelectedImageIndex(index)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div className="product-info-section">
//             <div className="product-header">
//               <h1>{product.title}</h1>
//               <div className="product-actions">
//                 <button className="btn-outline">
//                   <i className="fa fa-heart"></i> Save
//                 </button>
//                 <button className="btn-outline">
//                   <i className="fa fa-share"></i> Share
//                 </button>
//               </div>
//             </div>

//             <div className="price-section">
//               <div className="price">₹{product.price.toLocaleString()}</div>
//               {product.originalPrice && (
//                 <div className="original-price">₹{product.originalPrice.toLocaleString()}</div>
//               )}
//               {product.negotiable && <span className="negotiable-tag">Negotiable</span>}
//             </div>

//             <div className="product-meta-info">
//               <div className="meta-item">
//                 <span className="label">Condition:</span>
//                 <span className={`status status--${product.condition === 'like-new' ? 'success' : 'info'}`}>
//                   {product.condition}
//                 </span>
//               </div>
//               <div className="meta-item">
//                 <span className="label">Category:</span>
//                 <span>{product.category} &gt; {product.subcategory}</span>
//               </div>
//               <div className="meta-item">
//                 <span className="label">Location:</span>
//                 <span>
//                   <i className="fa fa-map-marker"></i>
//                   {product.location.area}, {product.location.city}
//                 </span>
//               </div>
//               <div className="meta-item">
//                 <span className="label">Posted:</span>
//                 <span>{new Date(product.postedDate).toLocaleDateString()}</span>
//               </div>
//             </div>

//             {/* Contact Actions */}
//             <div className="contact-actions">
//               <button 
//                 className="btn-primary btn-full-width"
//                 onClick={() => setShowContactModal(true)}
//               >
//                 <i className="fa fa-phone"></i>
//                 Contact Seller
//               </button>
//               <button className="btn-secondary btn-full-width">
//                 <i className="fa fa-comment"></i>
//                 Send Message
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="description-section">
//           <h3>Description</h3>
//           <p>{product.description}</p>
          
//           {product.tags && (
//             <div className="product-tags">
//               <h4>Tags:</h4>
//               <div className="tags-list">
//                 {product.tags.map(tag => (
//                   <span key={tag} className="tag">#{tag}</span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Seller Info */}
//         <div className="seller-info">
//           <h3>Seller Information</h3>
//           <div className="seller-profile">
//             <img src={product.seller.avatar} alt={product.seller.name} className="seller-avatar" />
//             <div className="seller-details">
//               <h4>{product.seller.name}</h4>
//               {product.seller.verified && (
//                 <span className="verified-badge">
//                   <i className="fa fa-check-circle"></i> Verified
//                 </span>
//               )}
//               <div className="seller-rating">
//                 <span className="stars">★★★★★</span>
//                 <span>{product.seller.rating}/5 ({product.seller.totalReviews} reviews)</span>
//               </div>
//               <p>Member since {new Date(product.seller.joinedDate).getFullYear()}</p>
//             </div>
//           </div>
//         </div>

//         {/* Contact Modal */}
//         {showContactModal && (
//           <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
//             <div className="modal-content" onClick={e => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h3>Contact Seller</h3>
//                 <button 
//                   className="close-btn"
//                   onClick={() => setShowContactModal(false)}
//                 >
//                   <i className="fa fa-times"></i>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <div className="contact-info">
//                   <p><strong>Name:</strong> {product.seller.name}</p>
//                   <p><strong>Phone:</strong> {product.seller.phone}</p>
//                   <p><strong>Email:</strong> {product.seller.email}</p>
//                 </div>
//                 <div className="contact-actions">
//                   <a href={`tel:${product.seller.phone}`} className="btn-primary">
//                     <i className="fa fa-phone"></i> Call Now
//                   </a>
//                   <a href={`mailto:${product.seller.email}`} className="btn-secondary">
//                     <i className="fa fa-envelope"></i> Send Email
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

return (
  <>
    {/* <!-- Product Detail Page --> */}
        <div className="page" id="productDetailPage">
            <div className="container">
                <div className="product-detail">
                    <div className="product-images">
                        <div className="main-image">
                            <img id="mainProductImage" src="" alt="" />
                        </div>
                        <div className="image-thumbnails" id="imageThumbnails"></div>
                    </div>
                    <div className="product-info">
                        <div className="product-header">
                            <h1 id="productTitle"></h1>
                            <div className="product-actions">
                                <button className="btn-outline wishlist-btn" id="addToWishlist">
                                    <i className="fas fa-heart"></i> Add to Wishlist
                                </button>
                                <button className="btn-outline share-btn">
                                    <i className="fas fa-share"></i> Share
                                </button>
                            </div>
                        </div>
                        <div className="price-section">
                            <span className="price" id="productPrice"></span>
                        </div>
                        <div className="product-meta">
                            <div className="meta-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span id="productLocation"></span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-calendar"></i>
                                <span id="productDate"></span>
                            </div>
                            <div className="meta-item">
                                <i className="fas fa-tag"></i>
                                <span id="productCategory"></span>
                            </div>
                        </div>
                        <div className="seller-info">
                            <div className="seller-profile">
                                <div className="seller-avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="seller-details">
                                    <h3 id="sellerName"></h3>
                                    <div className="seller-rating">
                                        <div className="stars" id="sellerStars"></div>
                                        <span id="sellerRating"></span>
                                    </div>
                                    <p>Member since <span id="sellerJoinDate"></span></p>
                                </div>
                            </div>
                            <button className="btn-primary" id="contactSellerBtn">
                                <i className="fas fa-comments"></i> Contact Seller
                            </button>
                        </div>
                        <div className="description-section">
                            <h3>Description</h3>
                            <p id="productDescription"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
                                <input type="number" id="minPrice" placeholder="Min" className="form-control" />
                                <input type="number" id="maxPrice" placeholder="Max" className="form-control" />
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

export default ProductDetailsPage;