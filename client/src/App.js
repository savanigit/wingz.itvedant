import React, { useEffect } from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

import Footer from './components/Footer';
import NewsletterSignup from './components/NewsletterSignup';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import OurWork from './pages/OurWork';
import Projects from './pages/Project'; 
import Contact from './pages/Contact';   
import Donate from './pages/Donate';
import DonateSuccess from './pages/DonateSuccess';
import Media from './pages/Media';
import GetInvolved from './pages/GetInvolved';
import Login from './pages/Login';
import Blog from './pages/Blog';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeMgmt from './pages/EmployeeMgmt';
import Events from './pages/Events';
import Campaigns from './pages/Campaigns';

// Initialize Google Analytics (if ID is provided)
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || '';
if (GA_TRACKING_ID) {
  ReactGA.initialize(GA_TRACKING_ID);
}

// Track page views
function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    if (GA_TRACKING_ID) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    }
  }, [location]);
}

// Create a component for the Navbar so we can conditionally hide it
function NavigationBar() {
  const location = useLocation();
  // Hide navbar on Admin pages and Login page
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null; 
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">My NGO</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/work">Our Work</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/media">Media</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/get-involved">Get Involved</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/campaigns">Campaigns</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              <li className="nav-item ms-lg-2"><Link className="btn btn-warning btn-sm mt-1 mt-lg-0" to="/donate">Donate</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
              {/* Link to Login Page */}
              <li className="nav-item ms-lg-2"><Link className="btn btn-outline-light btn-sm mt-1 mt-lg-0" to="/login">Admin</Link></li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

function FooterWrapper() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') {
    return null; 
  }
  return (
    <>
      <NewsletterSignup />
      <Footer />
    </>
  );
}

function AppContent() {
  usePageTracking();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar /> 
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<OurWork />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate-success" element={<DonateSuccess />} />
          <Route path="/media" element={<Media />} />
          <Route path="/get-involved" element={<GetInvolved />} /> 
          <Route path="/events" element={<Events />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<EmployeeMgmt />} />
        </Routes>
      </div>
      <FooterWrapper />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;