import React from 'react'

function Footer() {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>ClassNameiFind</h3>
                    <p>Buy and sell with confidence</p>
                    <div className="social-links">
                        <a href="#" target="_blank"><i className="fab fa-facebook"></i></a>
                        <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
                        <a href="#" target="_blank"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#" target="_blank">Help Center</a></li>
                        <li><a href="#" target="_blank">Contact Us</a></li>
                        <li><a href="#" target="_blank">Safety Tips</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#" target="_blank">Terms of Service</a></li>
                        <li><a href="#" target="_blank">Privacy Policy</a></li>
                        <li><a href="#" target="_blank">Cookie Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>About</h4>
                    <ul>
                        <li><a href="#" target="_blank">About Us</a></li>
                        <li><a href="#" target="_blank">Careers</a></li>
                        <li><a href="#" target="_blank">Press</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 ClassNameiFind. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    </>
  )
}

export default Footer