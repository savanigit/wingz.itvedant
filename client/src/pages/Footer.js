import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          {/* Column 1: About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">My NGO</h5>
            <p>
              Making the world a better place, one step at a time. Join us in our mission 
              to help the underprivileged.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Quick Links</h5>
            <p><Link to="/" className="text-white" style={{textDecoration: 'none'}}>Home</Link></p>
            <p><Link to="/about" className="text-white" style={{textDecoration: 'none'}}>About Us</Link></p>
            <p><Link to="/donate" className="text-white" style={{textDecoration: 'none'}}>Donate</Link></p>
            <p><Link to="/blog" className="text-white" style={{textDecoration: 'none'}}>Blog</Link></p>
          </div>

          {/* Column 3: Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Contact</h5>
            <p><i className="fas fa-home me-3"></i> New Delhi, India 110001</p>
            <p><i className="fas fa-envelope me-3"></i> contact@myngo.org</p>
            <p><i className="fas fa-phone me-3"></i> +91 98765 43210</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>Copyright © {new Date().getFullYear()} All rights reserved by 
              <strong className="text-warning"> My NGO</strong>
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-facebook"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-twitter"></i></a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="btn-floating btn-sm text-white" style={{fontSize: '23px'}}><i className="fab fa-instagram"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;