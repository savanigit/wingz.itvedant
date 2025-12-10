import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="text-muted">
              Dedicated to creating lasting impact in the lives of underprivileged children and communities.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link to="/work" className="text-muted text-decoration-none">Our Work</Link></li>
              <li><Link to="/projects" className="text-muted text-decoration-none">Projects</Link></li>
              <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Info</h5>
            <p className="text-muted">
              Email: contact@myngo.org<br />
              Phone: +91 98765 43210<br />
              Address: New Delhi, India
            </p>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <p className="mb-0">&copy; 2025 My NGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
