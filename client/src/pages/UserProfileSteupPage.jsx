import React from 'react'

function UserProfileSteupPage() {
  return (
    <>
           {/* <!-- User Dashboard --> */}
           <div className="page hidden" id="userDashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1>My Dashboard</h1>
                </div>
                
                <div className="dashboard-nav">
                    <button className="dashboard-tab active" data-tab="my-ads">My Ads</button>
                    <button className="dashboard-tab" data-tab="favorites">Favorites</button>
                    <button className="dashboard-tab" data-tab="profile">Profile</button>
                </div>
                
                <div className="dashboard-content">
                    {/* <!-- My Ads --> */}
                    <div className="dashboard-panel" id="myAdsPanel">
                        <div className="panel-header">
                            <h2>My Advertisements</h2>
                            <button className="btn-primary" id="createAdBtn">
                                <i className="fas fa-plus"></i> Post New Ad
                            </button>
                        </div>
                        <div className="products-grid" id="userAdsGrid"></div>
                    </div>
                    
                    {/* <!-- Favorites --> */}
                    <div className="dashboard-panel hidden" id="favoritesPanel">
                        <div className="panel-header">
                            <h2>My Favorites</h2>
                        </div>
                        <div className="products-grid" id="favoritesGrid"></div>
                    </div>
                    
                    {/* <!-- Profile --> */}
                    <div className="dashboard-panel hidden" id="profilePanel">
                        <div className="panel-header">
                            <h2>Profile Settings</h2>
                        </div>
                        <form className="profile-form" id="profileForm">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" id="profileName"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="profileEmail"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input type="tel" className="form-control" id="profilePhone" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <select className="form-control" id="profileLocation"></select>
                            </div>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfileSteupPage